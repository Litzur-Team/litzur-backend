import { z } from 'zod';

export const createLandingPageSchema = z.object({
  title: z.string().min(1, { message: 'O título é obrigatório' }),
  slug: z.string()
    .min(1, { message: 'O slug é obrigatório' })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { 
      message: 'O slug deve conter apenas letras minúsculas, números e hífens' 
    }),
  published: z.boolean().optional(),
  content: z.any({ message: 'O conteúdo é obrigatório' }),
  userId: z.string().min(1, { message: 'O userId é obrigatório' })
});

export const updateLandingPageSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { 
      message: 'O slug deve conter apenas letras minúsculas, números e hífens' 
    })
    .optional(),
  published: z.boolean().optional(),
  content: z.any().optional()
});

export type CreateLandingPageInput = z.infer<typeof createLandingPageSchema>;
export type UpdateLandingPageInput = z.infer<typeof updateLandingPageSchema>;
