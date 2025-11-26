import express, { Application } from 'express';
import routes from './api/routes/index.js';
import cors from 'cors';

const app: Application = express();

app.use(cors());

app.use(express.json());

app.use('/api', routes);

export default app;