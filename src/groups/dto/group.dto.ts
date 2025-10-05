import { z } from 'zod';
import {
  createGroupSchema,
  paramIdSchema,
  updateGroupSchema,
} from '../schemas/group.schema';
import { IdSchema } from '@/common/schemas';

export type CreateGroupDto = z.infer<typeof createGroupSchema>;
export type UpdateGroupDto = z.infer<typeof updateGroupSchema>;
export type ParamId = z.infer<typeof paramIdSchema>;
export type Id = z.infer<typeof IdSchema>;
