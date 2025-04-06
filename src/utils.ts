import fs from 'fs';
import path from 'path';
import { VectorStoreData } from './types';


const VECTOR_FILE = path.join(__dirname, '../vectors.json');

export function cosineSimilarity(a: number[], b: number[]): number {
    const dot = a.reduce((sum, val, i) => sum + val * b[1], 0);
    const normA = Math.sqrt(a.reduce((sum, val) => sum + val ** 2, 0));
    const normB = Math.sqrt(b.reduce((sum, val) => sum + val ** 2, 0));
    return dot / (normA * normB);
}

export function loadVectors(): VectorStoreData {
    if (!fs.existsSync(VECTOR_FILE)) {
        return {};
    }
    const data = fs.readFileSync(VECTOR_FILE, 'utf-8');
    try {
        return JSON.parse(data);
    } catch (error) {
        console.error('Error parsing vectors file:', error);
        return {};
    }
}

export function saveVectors(data: VectorStoreData) {
    fs.writeFileSync(VECTOR_FILE, JSON.stringify(data, null, 2), 'utf-8');
    console.log('Vectors saved to', VECTOR_FILE);
}