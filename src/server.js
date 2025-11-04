// src/server.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';
import userRoutes from './routes/user.routes.js';

// Kết nối MongoDB
await connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Chọn format log phù hợp
const logFormat = ['dev', 'tiny', 'common'].includes(env.LOG_LEVEL)
  ? env.LOG_LEVEL
  : 'dev';
app.use(morgan(logFormat));

// Health check
app.get('/api/v1/health', (_req, res) => res.json({ ok: true }));

// Routes
app.use('/api/v1/users', userRoutes);

// 404 fallback
app.use((_req, res) => res.status(404).json({ error: 'not_found' }));

// Start server
app.listen(env.PORT, () => {
  console.log(`🚀 Resource server running at http://localhost:${env.PORT}`);
});
