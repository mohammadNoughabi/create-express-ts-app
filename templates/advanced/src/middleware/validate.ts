import type { Request, Response, NextFunction } from 'express';
import { z, type ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Validation failed',
            details: err.errors,
          },
        });
      }
      next(err);
    }
  };
};
