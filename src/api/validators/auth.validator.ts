import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(1, { message: 'A senha é obrigatória' }),
});

export type LoginInput = z.infer<typeof loginSchema>;
