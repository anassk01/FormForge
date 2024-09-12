export class PerformanceMetrics {
    totalParseTime: number = 0;
    parseCount: number = 0;
    cacheHits: number = 0;
    cacheMisses: number = 0;
    errorCount: number = 0;
    fieldParseTime: { [fieldType: string]: number } = {};
  }
  
  export class PerformanceMonitor {
    private metrics: PerformanceMetrics = new PerformanceMetrics();
  
    startParse(): number {
      return Date.now();
    }
  
    endParse(startTime: number): void {
      this.metrics.totalParseTime += Date.now() - startTime;
      this.metrics.parseCount++;
    }
  
    recordCacheHit(): void {
      this.metrics.cacheHits++;
    }
  
    recordCacheMiss(): void {
      this.metrics.cacheMisses++;
    }
  
    recordError(): void {
      this.metrics.errorCount++;
    }
  
    startFieldParse(fieldType: string): number {
      return Date.now();
    }
  
    endFieldParse(fieldType: string, startTime: number): void {
      const parseTime = Date.now() - startTime;
      this.metrics.fieldParseTime[fieldType] = (this.metrics.fieldParseTime[fieldType] || 0) + parseTime;
    }
  
    getMetrics(): PerformanceMetrics {
      return { ...this.metrics };
    }
  
    reset(): void {
      this.metrics = new PerformanceMetrics();
    }
  }