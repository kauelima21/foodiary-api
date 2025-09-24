import { z } from 'zod';

export const signUpSchema = z.object({
  account: z.object({
    email: z.string().min(1).email(),
    password: z.string().min(8),
  }),
});

export type SignUpBody = z.infer<typeof signUpSchema>;
