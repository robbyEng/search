import express, { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3000;

const historyFilePath = path.join(__dirname, 'queryHistory.json');

const corsOptions = {
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));

const readQueryHistory = (): string[] => {
  try {
    const data = fs.readFileSync(historyFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

const saveQueryHistory = (history: string[]): void => {
  fs.writeFileSync(historyFilePath, JSON.stringify(history, null, 2), 'utf8');
};

app.get('/api/search', async (req: any, res: any) => {
  try {
    const query = req.query.q as string;

    if (!query) {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    const response = await axios.get('http://api.duckduckgo.com/', {
      params: { q: query, format: 'json' }
    });

    const results = response.data.RelatedTopics.map((topic: any) => ({
      title: topic.Text,
      url: topic.FirstURL,
    }));

    res.json(results);
  } catch (error) {
    console.error('Erro ao buscar resultados:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/history', (req: Request, res: Response) => {
  const queryHistory = readQueryHistory();
  res.json(queryHistory);
});

app.post('/api/history', (req: any, res: any) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  const queryHistory = readQueryHistory();

  if (!queryHistory.includes(query)) {
    queryHistory.push(query);
    saveQueryHistory(queryHistory);
  }

  res.status(201).json({ message: 'Query added to history' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
