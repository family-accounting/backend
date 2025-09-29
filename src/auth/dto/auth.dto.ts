import type { z } from 'zod';
import { createUserSchema } from '@/users/dto/user.dto';

export const registerAuthSchema = createUserSchema.strict();

export const loginAuthSchema = createUserSchema
  .pick({
    mobile: true,
    password: true,
  })
  .strict();

export type RegisterAuthDto = z.infer<typeof registerAuthSchema>;
export type LoginAuthDto = z.infer<typeof loginAuthSchema>;
