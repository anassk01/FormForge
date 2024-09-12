import { ParsedStructure } from './types';

export class ParserCache {
  private cache: Map<string, ParsedStructure> = new Map();
  private maxSize: number;

  constructor(maxSize: number = 100) {
    this.maxSize = maxSize;
  }

  get(key: string): ParsedStructure | undefined {
    const cachedResult = this.cache.get(key);
    if (cachedResult) {
      // Move the accessed item to the end to implement LRU
      this.cache.delete(key);
      this.cache.set(key, cachedResult);
    }
    return cachedResult;
  }

  set(key: string | undefined, value: ParsedStructure): void {
    if (key === undefined) return;
    
    if (this.cache.size >= this.maxSize) {
      // Remove the least recently used item (first item in the map)
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(key, value);
  }

  clear(): void {
    this.cache.clear();
  }

  getSize(): number {
    return this.cache.size;
  }
}