import { z } from 'zod';
import { IdSchema } from '../../common/schemas';

export const paramIdSchema = z.object({
  id: IdSchema,
});
export const createTransactionSchema = z.object({
  id: IdSchema,
});
export const updateTransactionSchema = z.object();

export type Id = z.infer<typeof IdSchema>;
export type ParamId = z.infer<typeof paramIdSchema>;
export type CreateTransactionDto = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionDto = z.infer<typeof updateTransactionSchema>;
