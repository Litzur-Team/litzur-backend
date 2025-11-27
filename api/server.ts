import app from '../src/app.js';
import swaggerUI from 'swagger-ui-express';
import { swaggerSpec } from '../src/config/swagger.config.js';

// Mount Swagger docs (was in src/server.ts for local dev)
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Export Express app as default for Vercel serverless
export default app;
