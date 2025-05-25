export class PerformanceMonitor {
  private metrics: Map<string, { count: number; totalTime: number; min: number; max: number }> = new Map();
  private events: { name: string; startTime: number; endTime: number; metadata?: any }[] = [];
  private maxEvents: number;
  private isRecording: boolean = false;
  private recordingStartTime: number = 0;
  private recordingEndTime: number = 0;
  
  constructor(options: { maxEvents?: number } = {}) {
    this.maxEvents = options.maxEvents || 1000;
  }
  
  
  public startMeasure(name: string): () => void {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      this.recordMetric(name, endTime - startTime);
    };
  }
  
  public measureSync<T>(name: string, fn: () => T): T {
    const startTime = performance.now();
    
    try {
      const result = fn();
      const endTime = performance.now();
      this.recordMetric(name, endTime - startTime);
      return result;
    } catch (error) {
      const endTime = performance.now();
      this.recordMetric(`${name}_error`, endTime - startTime);
      throw error;
    }
  }
  
  public async measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
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
  
  private recordMetric(name: string, time: number) {
    const metric = this.metrics.get(name) || { count: 0, totalTime: 0, min: Infinity, max: 0 };
    
    metric.count++;
    metric.totalTime += time;
    metric.min = Math.min(metric.min, time);
    metric.max = Math.max(metric.max, time);
    
    this.metrics.set(name, metric);
    
    if (this.isRecording) {
      this.events.push({
        name,
        startTime: performance.now() - time,
        endTime: performance.now()
      });
      
      if (this.events.length > this.maxEvents) {
        this.events.shift();
      }
    }
  }
  
  public getMetrics(name?: string) {
    if (name) {
      const metric = this.metrics.get(name);
      
      if (!metric) {
        return null;
      }
      
      return {
        count: metric.count,
        averageTime: metric.totalTime / metric.count,
        minTime: metric.min,
        maxTime: metric.max,
        totalTime: metric.totalTime
      };
    }
    
    const result: Record<string, { count: number; averageTime: number; minTime: number; maxTime: number; totalTime: number }> = {};
    
    for (const [k, metric] of this.metrics.entries()) {
      result[k] = {
        count: metric.count,
        averageTime: metric.totalTime / metric.count,
        minTime: metric.min,
        maxTime: metric.max,
        totalTime: metric.totalTime
      };
    }
    
    return result;
  }
  
  public clearMetrics(name?: string) {
    if (name) {
      this.metrics.delete(name);
    } else {
      this.metrics.clear();
    }
  }
  
  
  public startRecording() {
    this.isRecording = true;
    this.recordingStartTime = performance.now();
    this.events = [];
  }
  
  public stopRecording() {
    this.isRecording = false;
    this.recordingEndTime = performance.now();
  }
  
  public getRecording() {
    return {
      startTime: this.recordingStartTime,
      endTime: this.recordingEndTime,
      duration: this.recordingEndTime - this.recordingStartTime,
      events: this.events
    };
  }
  
  public clearRecording() {
    this.events = [];
    this.recordingStartTime = 0;
    this.recordingEndTime = 0;
  }
  
  
  public analyzePerformance() {
    const metrics = this.getMetrics();
    const recording = this.getRecording();
    
    const metricsEntries = metrics ? Object.entries(metrics) : [];
    
    const slowOperations = metricsEntries
      .filter(([_, metric]) => metric.averageTime > 100) // Operations taking more than 100ms on average
      .sort((a, b) => b[1].averageTime - a[1].averageTime);
    
    const frequentOperations = metricsEntries
      .filter(([_, metric]) => metric.count > 10) // Operations called more than 10 times
      .sort((a, b) => b[1].count - a[1].count);
    
    const bottlenecks = metricsEntries
      .sort((a, b) => b[1].totalTime - a[1].totalTime);
    
    const concurrentOperations: { name1: string; name2: string; overlapCount: number }[] = [];
    
    if (recording.events.length > 0) {
      for (let i = 0; i < recording.events.length; i++) {
        const event1 = recording.events[i];
        
        for (let j = i + 1; j < recording.events.length; j++) {
          const event2 = recording.events[j];
          
          if (
            (event1.startTime <= event2.startTime && event1.endTime >= event2.startTime) ||
            (event2.startTime <= event1.startTime && event2.endTime >= event1.startTime)
          ) {
            const existingIndex = concurrentOperations.findIndex(
              op => (op.name1 === event1.name && op.name2 === event2.name) ||
                    (op.name1 === event2.name && op.name2 === event1.name)
            );
            
            if (existingIndex >= 0) {
              concurrentOperations[existingIndex].overlapCount++;
            } else {
              concurrentOperations.push({
                name1: event1.name,
                name2: event2.name,
                overlapCount: 1
              });
            }
          }
        }
      }
    }
    
    concurrentOperations.sort((a, b) => b.overlapCount - a.overlapCount);
    
    return {
      metrics,
      recording,
      analysis: {
        slowOperations: slowOperations.slice(0, 10),
        frequentOperations: frequentOperations.slice(0, 10),
        bottlenecks: bottlenecks.slice(0, 10),
        concurrentOperations: concurrentOperations.slice(0, 10)
      },
      recommendations: this.generateRecommendations(
        slowOperations,
        frequentOperations,
        bottlenecks,
        concurrentOperations
      )
    };
  }
  
  private generateRecommendations(
    slowOperations: [string, { count: number; averageTime: number; minTime: number; maxTime: number; totalTime: number }][],
    frequentOperations: [string, { count: number; averageTime: number; minTime: number; maxTime: number; totalTime: number }][],
    bottlenecks: [string, { count: number; averageTime: number; minTime: number; maxTime: number; totalTime: number }][],
    concurrentOperations: { name1: string; name2: string; overlapCount: number }[]
  ) {
    const recommendations: string[] = [];
    
    if (slowOperations.length > 0) {
      recommendations.push(`Optimize the following slow operations: ${slowOperations.slice(0, 3).map(([name]) => name).join(', ')}`);
    }
    
    const frequentAndSlow = frequentOperations.filter(([name]) => 
      slowOperations.some(([slowName]) => slowName === name)
    );
    
    if (frequentAndSlow.length > 0) {
      recommendations.push(`Prioritize optimizing these frequent and slow operations: ${frequentAndSlow.slice(0, 3).map(([name]) => name).join(', ')}`);
    }
    
    if (bottlenecks.length > 0) {
      recommendations.push(`Address these performance bottlenecks: ${bottlenecks.slice(0, 3).map(([name]) => name).join(', ')}`);
    }
    
    if (concurrentOperations.length > 0) {
      recommendations.push(`Consider parallelizing these concurrent operations: ${concurrentOperations.slice(0, 3).map(op => `${op.name1} and ${op.name2}`).join(', ')}`);
    }
    
    if (slowOperations.some(([_, metric]) => metric.averageTime > 500)) {
      recommendations.push('Consider implementing caching for operations taking more than 500ms');
    }
    
    if (frequentOperations.some(([_, metric]) => metric.count > 50)) {
      recommendations.push('Consider implementing debouncing or throttling for frequently called operations');
    }
    
    return recommendations;
  }
}
