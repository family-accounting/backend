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

export const createWalletSchema = z
  .object({
    name: z.string(),
    description: z.string().optional(),
  });

    export const updateWalletSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
  });

export type Id = z.infer<typeof IdSchema>;
export type CreateWalletDto = z.infer<typeof createWalletSchema>;
export type UpdateWalletDto = z.infer<typeof updateWalletSchema>;
export type ParamId = z.infer<typeof paramIdSchema>;
export type ParamName = z.infer<typeof paramNameSchema>;
