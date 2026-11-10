import cors from 'cors';
import express from 'express';
import { errorHandler, notFoundHandler } from './middleware/errors.js';
import { registerRoutes } from './routes.js';

export const app = express();

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
}));
app.use(express.json());

registerRoutes(app);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
