import { z } from 'zod';
import {
  IdSchema,
} from '@/common/schemas';

export const paramIdSchema = z.object({
  id: IdSchema,
});

export const paramNameSchema = z.object({
  name: z.string(),
});

export const createTagSchema = z
  .object({
    name: z.string(),
    description: z.string().optional(),
    color: z.string().optional(),
  });

    export const updateTagSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    color: z.string().optional(),
  });

export type Id = z.infer<typeof IdSchema>;
export type CreateTagDto = z.infer<typeof createTagSchema>;
export type UpdateTagDto = z.infer<typeof updateTagSchema>;
export type ParamId = z.infer<typeof paramIdSchema>;
export type ParamName = z.infer<typeof paramNameSchema>;
