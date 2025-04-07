import { generateEmbedding } from "../lib/embedding";
import { VectorStore } from "../store";

const store = new VectorStore();

async function similaritySearch(text: string): Promise<void> {
    try {
        const embedding = await generateEmbedding(text);
        // console.log('Generated embedding for :', text, embedding);
        const results = store.search(embedding, { topK: 1 });
        console.log('Found results for ', results);
    } catch (error) {
        console.error('Error processing text:', error);
    }
}

similaritySearch("Hello, how are you?");
