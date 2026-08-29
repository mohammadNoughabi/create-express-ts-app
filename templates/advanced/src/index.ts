import { app } from './app.js';
import { env } from '@config/env.js';
import { logger } from '@config/logger.js';

app.listen(env.PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${env.PORT}`);
  logger.info(`📖 API docs available at http://localhost:${env.PORT}/api-docs`);
});
