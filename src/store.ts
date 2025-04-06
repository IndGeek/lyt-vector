import { v4 as uuid } from 'uuid';
import { cosineSimilarity, loadVectors, saveVectors } from './utils';
import { VectorRecord, VectorStoreData, VectorSearchOptions } from './types';

export class VectorStore {
  private store: VectorStoreData;

  constructor() {
    this.store = loadVectors();
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

    const results = Object.values(this.store)
      .map(record => ({
        id: record.id,
        score: cosineSimilarity(query, record.vector),
        metadata: record.metadata,
      }))
      .filter(r => r.score >= threshold)
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);

    return results;
  }
}
