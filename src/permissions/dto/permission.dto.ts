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

export const createPermissionSchema = z
  .object({
    name: z.string(),
    description: z.string().optional(),
  });

export const updatePermissionSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
  });

export type CreatePermissionDto = z.infer<typeof createPermissionSchema>;
export type UpdatePermissionDto = z.infer<typeof updatePermissionSchema>;
export type ParamId = z.infer<typeof paramIdSchema>;
export type ParamName = z.infer<typeof paramNameSchema>;
