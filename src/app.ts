import express, { Application } from 'express';
import routes from './api/routes/index.js';

const app: Application = express();

app.use(express.json());

app.use('/api', routes);

export default app;