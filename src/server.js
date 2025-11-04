
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { env } from './config/env.js';
import userRoutes from './routes/user.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan(env.LOG_LEVEL));

// Health
app.get('/api/v1/health', (_req, res) => res.json({ ok: true }));

// Routes
app.use('/', userRoutes);

// 404 fallback
app.use((_req, res) => res.status(404).json({ error: 'not_found' }));

app.listen(env.PORT, () => {
  console.log(`Resource server running at http://localhost:${env.PORT}`);
});
