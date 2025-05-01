import { VectorStore } from '../store';
import { generateEmbedding } from '../lib/embedding';

const store = new VectorStore();

async function processText(input: { text: string, metadata: any }): Promise<void> {
    try {
        const embedding = await generateEmbedding(input.text);
        const id = store.addVector(embedding, input.metadata);
        console.log('Stored vector with ID:', id);
    } catch (error) {
        console.error('Error processing text:', error);
    }
}

const input = {
    text: "This is a nice project",
    metadata: {
        title: "This is a nice project",
        description: "This is a nice project description"
    },
};
processText(input);