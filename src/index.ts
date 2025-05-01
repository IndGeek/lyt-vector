import express, { Request, Response } from 'express';
import { VectorStore } from './store';
import { generateEmbedding } from './lib/embedding';
import { getFromCache, setToCache } from './lib/cache';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const store = new VectorStore({ useCache: process.env.CACHE_API === 'true' });

app.use(cors(
  {
    origin: '*',
    methods: ['GET', 'POST']
  }
));

app.use(express.json());

app.post('/add', async (req: Request, res: Response): Promise<any> => {
  const { content, metadata } = req.body;

  const contentToEmbedding = await generateEmbedding(content);

  if (!Array.isArray(contentToEmbedding)) return res.status(400).json({ error: 'Vector must be an array of numbers' });
  const id = store.addVector(contentToEmbedding, metadata);
  res.json({ id });
});

app.get('/vector/:id', (req: Request, res: Response): any => {
  const vector = store.getVector(req.params.id);
  if (!vector) return res.status(404).json({ error: 'Vector not found' });
  res.json({ id: req.params.id, vector });
});

app.post('/search', async (req: Request, res: Response): Promise<any> => {
  const { query, threshold = 0, topK = 5, useCache = true } = req.body;

  const cacheKey = `query:${String(query)}&threshold:${threshold}&topK:${topK}`;

  if (useCache && process.env.CACHE_API === 'true') {
    const cached = getFromCache(cacheKey);
    if(cached) return res.json(cached);
  }
  
  const queryToEmbedding = await generateEmbedding(query);
  if (!Array.isArray(queryToEmbedding)) return res.status(400).json({ error: 'Query must be a vector' });
  const results = store.search(queryToEmbedding, { threshold, topK });

  if(useCache && process.env.CACHE_API === 'true') setToCache(cacheKey, results);

  res.json(results);
});

app.listen(port, () => {
  console.log(`✅ Vector Store server running on ${port}`);
});
