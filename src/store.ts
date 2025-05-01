import { v4 as uuid } from 'uuid';
import { cosineSimilarity, loadVectors, saveVectors } from './utils';
import { VectorRecord, VectorStoreData, VectorSearchOptions } from './types';
import { getFromCache, setToCache } from './lib/cache';

export class VectorStore {
  private store: VectorStoreData;
  private useCache: boolean;

  constructor(options?: { useCache?: boolean }) {
    const { useCache = true } = options || {};
    this.store = loadVectors();
    this.useCache = useCache;
  }

  addVector(vector: number[], metadata: Record<string, any> = {}) {
    const id = uuid();
    this.store[id] = { id, vector, metadata };
    saveVectors(this.store);
    return id;
  }

  getVector(id: string): VectorRecord | undefined {
    return this.store[id];
  }

  search(query: number[], options: VectorSearchOptions = {}) {
    const threshold = options.threshold ?? 0;
    const topK = options.topK ?? Object.keys(this.store).length;

    const cacheKey = `query:${String(query)}&threshold:${threshold}&topK:${topK}`;
    if (this.useCache) {
      const cachedResults = getFromCache(cacheKey);
      if (cachedResults) {
        console.log('Using cached results')
        return cachedResults;
      }
    }

    const results = Object.values(this.store)
      .map(record => ({
        id: record.id,
        score: cosineSimilarity(query, record.vector),
        metadata: record.metadata,
      }))
      .filter(r => r.score >= threshold)
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);

    if (this.useCache) {
      setToCache(cacheKey, results);
    }

    return results;
  }
}
