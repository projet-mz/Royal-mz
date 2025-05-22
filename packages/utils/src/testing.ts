export class TestUtilities {
  private static instance: TestUtilities;
  private testResults: Map<string, { passed: boolean; message?: string; duration: number }> = new Map();
  
  private constructor() {}
  
  public static getInstance(): TestUtilities {
    if (!TestUtilities.instance) {
      TestUtilities.instance = new TestUtilities();
    }
    
    return TestUtilities.instance;
  }
  
  public async runTest(name: string, testFn: () => Promise<void> | void): Promise<boolean> {
    const startTime = performance.now();
    
    try {
      await testFn();
      
      const endTime = performance.now();
      this.testResults.set(name, { passed: true, duration: endTime - startTime });
      
      console.log(`✅ Test passed: ${name} (${Math.round(endTime - startTime)}ms)`);
      
      return true;
    } catch (error) {
      const endTime = performance.now();
      this.testResults.set(name, { passed: false, message: error.message, duration: endTime - startTime });
      
      console.error(`❌ Test failed: ${name} (${Math.round(endTime - startTime)}ms)`);
      console.error(error);
      
      return false;
    }
  }
  
  public getTestResults() {
    return Object.fromEntries(this.testResults);
  }
  
  public getSummary() {
    const total = this.testResults.size;
    const passed = Array.from(this.testResults.values()).filter(result => result.passed).length;
    const failed = total - passed;
    
    return {
      total,
      passed,
      failed,
      passRate: total > 0 ? (passed / total) * 100 : 0
    };
  }
  
  public clearResults() {
    this.testResults.clear();
  }
  
  
  public assertEqual<T>(actual: T, expected: T, message?: string) {
    if (actual !== expected) {
      throw new Error(message || `Expected ${expected} but got ${actual}`);
    }
  }
  
  public assertNotEqual<T>(actual: T, expected: T, message?: string) {
    if (actual === expected) {
      throw new Error(message || `Expected ${actual} not to equal ${expected}`);
    }
  }
  
  public assertTrue(value: boolean, message?: string) {
    if (!value) {
      throw new Error(message || 'Expected true but got false');
    }
  }
  
  public assertFalse(value: boolean, message?: string) {
    if (value) {
      throw new Error(message || 'Expected false but got true');
    }
  }
  
  public assertDefined<T>(value: T | undefined | null, message?: string) {
    if (value === undefined || value === null) {
      throw new Error(message || 'Expected value to be defined but got undefined or null');
    }
  }
  
  public assertUndefined(value: any, message?: string) {
    if (value !== undefined) {
      throw new Error(message || `Expected undefined but got ${value}`);
    }
  }
  
  public assertNull(value: any, message?: string) {
    if (value !== null) {
      throw new Error(message || `Expected null but got ${value}`);
    }
  }
  
  public assertNotNull(value: any, message?: string) {
    if (value === null) {
      throw new Error(message || 'Expected not null but got null');
    }
  }
  
  public assertContains<T>(array: T[], value: T, message?: string) {
    if (!array.includes(value)) {
      throw new Error(message || `Expected array to contain ${value} but it did not`);
    }
  }
  
  public assertNotContains<T>(array: T[], value: T, message?: string) {
    if (array.includes(value)) {
      throw new Error(message || `Expected array not to contain ${value} but it did`);
    }
  }
  
  public assertLength<T>(array: T[], length: number, message?: string) {
    if (array.length !== length) {
      throw new Error(message || `Expected array to have length ${length} but got ${array.length}`);
    }
  }
  
  public assertEmpty<T>(array: T[], message?: string) {
    if (array.length !== 0) {
      throw new Error(message || `Expected array to be empty but got ${array.length} elements`);
    }
  }
  
  public assertNotEmpty<T>(array: T[], message?: string) {
    if (array.length === 0) {
      throw new Error(message || 'Expected array not to be empty but it was');
    }
  }
  
  public assertThrows(fn: () => void, message?: string) {
    try {
      fn();
      throw new Error(message || 'Expected function to throw but it did not');
    } catch (error) {
    }
  }
  
  public async assertRejects(fn: () => Promise<any>, message?: string) {
    try {
      await fn();
      throw new Error(message || 'Expected promise to reject but it resolved');
    } catch (error) {
    }
  }
  
  public assertPerformance(fn: () => void, maxTime: number, message?: string) {
    const startTime = performance.now();
    fn();
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    if (duration > maxTime) {
      throw new Error(message || `Expected function to complete in ${maxTime}ms but it took ${duration}ms`);
    }
  }
  
  public async assertAsyncPerformance(fn: () => Promise<any>, maxTime: number, message?: string) {
    const startTime = performance.now();
    await fn();
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    if (duration > maxTime) {
      throw new Error(message || `Expected function to complete in ${maxTime}ms but it took ${duration}ms`);
    }
  }
}
