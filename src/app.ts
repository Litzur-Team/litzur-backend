import express, { Application } from 'express';
import routes from './api/routes/index.js';
import cors from 'cors';

const app: Application = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());

app.use('/api', routes);

export default app;