import { z } from 'zod';

export const createLeadSchema = z.object({
  customerEmail: z.string().email({ message: 'E-mail inválido' }),
  customerName: z.string().optional(),
  pageId: z.string().min(1, { message: 'O pageId é obrigatório' })
});

export const updateLeadSchema = z.object({
  customerEmail: z.string().email().optional(),
  customerName: z.string().optional()
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;
