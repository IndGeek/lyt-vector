import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { VectorStore } from '../store';
import { generateEmbedding } from '../lib/embedding';

const store = new VectorStore();

async function processText(input: { text: string, metadata: any }): Promise<void> {
    try {
        const embedding = await generateEmbedding(input.text);
        console.log('Generated embedding for :', input.text, embedding);
        const id = store.addVector(embedding, input.metadata);
        console.log('Stored vector with ID:', id);
    } catch (error) {
        console.error('Error processing text:', error);
    }
}

const input = {
    text: "What's up bro",
    metadata: {
        title: "Asking",
        description: "A simple question"
    },
};
processText(input);