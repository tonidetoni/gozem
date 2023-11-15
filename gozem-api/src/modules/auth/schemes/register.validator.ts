import { z } from 'zod';
export const registerValidator = z
  .object({
    email: z.string().email(),
    firstname: z.string(),
    lastname: z.string(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8)
  })
  .strict({ message: 'Unsupported property' })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'] // path of error
  });

export const confirmEmailValidator = z
  .object({
    id: z.string()
  })
  .strict({ message: 'Unsupported property' });
