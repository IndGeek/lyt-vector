export type Vector = number[];
export interface VectorRecord {
    id: string;
    vector: Vector;
    metadata?: Record<string, any>;
}
export interface VectorSearchOptions {
    topK?: number;
    threshold?: number;
    includeMetadata?: boolean;
}
export type VectorStoreData = Record<string, VectorRecord>;