import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny } from 'zod';
import { formatZodError } from '../api/validators/zodErrorFormatter.js';

export function validateBody(schema: ZodTypeAny) {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ errors: formatZodError(parsed.error) });
      return;
    }
    // attach parsed data to request for downstream usage if needed
    (req as any).validatedBody = parsed.data;
    next();
  };
}
