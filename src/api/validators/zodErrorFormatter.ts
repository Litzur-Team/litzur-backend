import { ZodError } from 'zod';

type FormattedError = { path?: string; message: string };

export function formatZodError(err: unknown): FormattedError[] {
  if (err instanceof ZodError) {
    return err.errors.map((e: { path: (string | number)[]; message: string }) => ({ path: e.path.join('.'), message: e.message }));
  }
  return [{ message: 'Validation error' }];
}
