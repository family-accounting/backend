import type { z } from 'zod';
import { createUserSchema } from '../../users/dto/user.dto';

export const registerAuthSchema = createUserSchema;

export const loginAuthSchema = createUserSchema.pick({
  mobile: true,
  password: true,
});

export type RegisterAuthDto = z.infer<typeof registerAuthSchema>;
export type LoginAuthDto = z.infer<typeof loginAuthSchema>;
