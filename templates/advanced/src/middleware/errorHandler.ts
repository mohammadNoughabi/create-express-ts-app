import type { ErrorRequestHandler } from 'express';
import { logger } from '@config/logger.js';
import { env } from '@config/env.js';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  logger.error(err);

  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
};
