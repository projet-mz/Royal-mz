export class PerformanceOptimizer {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private cacheTTL: number;
  private metrics: Map<string, { count: number; totalTime: number; min: number; max: number }> = new Map();
  private pendingRequests: Map<string, Promise<any>> = new Map();
  
  constructor(options: { cacheTTL?: number } = {}) {
    this.cacheTTL = options.cacheTTL || 5000; // 5 seconds default TTL
  }
  
  
  public async cachedFetch<T>(
    key: string,
    fetchFn: () => Promise<T>,
    options: { ttl?: number; forceRefresh?: boolean } = {}
  ): Promise<T> {
    const ttl = options.ttl || this.cacheTTL;
    const forceRefresh = options.forceRefresh || false;
    
    if (this.pendingRequests.has(key) && !forceRefresh) {
      return this.pendingRequests.get(key);
    }
    
    const cached = this.cache.get(key);
    const now = Date.now();
    
    if (cached && now - cached.timestamp < ttl && !forceRefresh) {
      return cached.data;
    }
    
    const startTime = performance.now();
    
    const fetchPromise = fetchFn().then(data => {
      this.cache.set(key, { data, timestamp: Date.now() });
      
      const endTime = performance.now();
      this.recordMetric(key, endTime - startTime);
      
      this.pendingRequests.delete(key);
      
      return data;
    }).catch(error => {
      this.pendingRequests.delete(key);
      throw error;
    });
    
    this.pendingRequests.set(key, fetchPromise);
    
    return fetchPromise;
  }
  
  public invalidateCache(key?: string) {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }
  
  
  private recordMetric(key: string, time: number) {
    const metric = this.metrics.get(key) || { count: 0, totalTime: 0, min: Infinity, max: 0 };
    
    metric.count++;
    metric.totalTime += time;
    metric.min = Math.min(metric.min, time);
    metric.max = Math.max(metric.max, time);
    
    this.metrics.set(key, metric);
  }
  
  public getMetrics(key?: string) {
    if (key) {
      const metric = this.metrics.get(key);
      
      if (!metric) {
        return null;
      }
      
      return {
        count: metric.count,
        averageTime: metric.totalTime / metric.count,
        minTime: metric.min,
        maxTime: metric.max
      };
    }
    
    const result: Record<string, { count: number; averageTime: number; minTime: number; maxTime: number }> = {};
    
    for (const [k, metric] of this.metrics.entries()) {
      result[k] = {
        count: metric.count,
        averageTime: metric.totalTime / metric.count,
        minTime: metric.min,
        maxTime: metric.max
      };
    }
    
    return result;
  }
  
  public clearMetrics(key?: string) {
    if (key) {
      this.metrics.delete(key);
    } else {
      this.metrics.clear();
    }
  }
  
  
  public preloadResources(resources: string[]) {
    if (typeof document === 'undefined') {
      return;
    }
    
    for (const resource of resources) {
      const extension = resource.split('.').pop()?.toLowerCase();
      
      if (!extension) {
        continue;
      }
      
      let link: HTMLLinkElement | null = null;
      
      if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
        link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = resource;
      } else if (['css'].includes(extension)) {
        link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = resource;
      } else if (['js'].includes(extension)) {
        link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'script';
        link.href = resource;
      } else if (['woff', 'woff2', 'ttf', 'otf'].includes(extension)) {
        link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.href = resource;
        link.crossOrigin = 'anonymous';
      }
      
      if (link) {
        document.head.appendChild(link);
      }
    }
  }
  
  
  public measurePerformance<T>(name: string, fn: () => T): T {
    const startTime = performance.now();
    const result = fn();
    const endTime = performance.now();
    
    this.recordMetric(name, endTime - startTime);
    
    return result;
  }
  
  public async measureAsyncPerformance<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const startTime = performance.now();
    
    try {
      const result = await fn();
      const endTime = performance.now();
      
      this.recordMetric(name, endTime - startTime);
      
      return result;
    } catch (error) {
      const endTime = performance.now();
      this.recordMetric(`${name}_error`, endTime - startTime);
      throw error;
    }
  }
}
