import { z } from 'zod';
import { IdSchema } from '@/common/schemas';

export const paramIdSchema = z.object({
  id: IdSchema,
});

export const paramNameSchema = z.object({
  name: z.string(),
});

export const createRoleSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export const updateRoleSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});

export type CreateRoleDto = z.infer<typeof createRoleSchema>;
export type UpdateRoleDto = z.infer<typeof updateRoleSchema>;
export type ParamId = z.infer<typeof paramIdSchema>;
export type ParamName = z.infer<typeof paramNameSchema>;
