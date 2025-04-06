import express, { Request, Response } from 'express';
import { VectorStore } from './store';

const app = express();
const port = process.env.PORT || 8080;
const store = new VectorStore();

app.use(express.json());

app.post('/add', (req: Request, res: Response): any => {
  const { vector } = req.body;
  if (!Array.isArray(vector)) return res.status(400).json({ error: 'Vector must be an array of numbers' });
  const id = store.addVector(vector);
  res.json({ id });
});

app.get('/vector/:id', (req: Request, res: Response): any => {
  const vector = store.getVector(req.params.id);
  if (!vector) return res.status(404).json({ error: 'Vector not found' });
  res.json({ id: req.params.id, vector });
});

app.post('/search', (req: Request, res: Response): any => {
  const { query, topK = 5 } = req.body;
  if (!Array.isArray(query)) return res.status(400).json({ error: 'Query must be a vector' });
  const results = store.search(query, topK);
  res.json(results);
});

app.listen(port, () => {
  console.log(`✅ Vector Store server running at http://localhost:${port}`);
});
