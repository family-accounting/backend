import { z } from 'zod';
import { IdSchema } from '@/common/schemas';

export const paramIdSchema = z.object({
  id: IdSchema,
});

export const paramNameSchema = z.object({
  name: z.string(),
});

export const createProfileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  mobile: z.string(),
  description: z.string().optional(),
});

export const updateProfileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  mobile: z.string().optional(),
  description: z.string().optional(),
});

export type Id = z.infer<typeof IdSchema>;
export type CreateProfileDto = z.infer<typeof createProfileSchema>;
export type UpdateProfileDto = z.infer<typeof updateProfileSchema>;
export type ParamId = z.infer<typeof paramIdSchema>;
export type ParamName = z.infer<typeof paramNameSchema>;
