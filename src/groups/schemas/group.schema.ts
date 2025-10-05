import { z } from 'zod';
import { IdSchema } from '@/common/schemas';

export class CreateGroupDto {}
export const paramIdSchema = z.object({
  id: IdSchema,
});

export const createGroupSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export const updateGroupSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});
