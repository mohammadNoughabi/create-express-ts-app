import express from 'express';
import { applySecurityMiddleware } from '@middleware/security.js';
import { errorHandler } from '@middleware/errorHandler.js';
import { setupSwagger } from '@config/swagger.js';
import router from '@routes/routes.js';

export const app = express();

app.use(express.json());

applySecurityMiddleware(app);
setupSwagger(app);

app.use('/api', router);

app.use((_req, res) => {
  res.status(404).json({ success: false, error: { message: 'Not found' } });
});

app.use(errorHandler);
