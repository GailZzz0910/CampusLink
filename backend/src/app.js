import cors from 'cors';
import express from 'express';
import { registerRoutes } from './routes.js';

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
}));
app.use(express.json());

registerRoutes(app);

app.use((req, res) => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: 'The requested API endpoint does not exist.',
    },
  });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'The server could not complete the request.',
    },
  });
});

export default app;
