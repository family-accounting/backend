import { z } from 'zod';
import { IdSchema } from '@/common/schemas';
import { TransactionTypeEnum } from '@/common/enums';

export const paramIdSchema = z.object({
  id: IdSchema,
});
export const createTransactionSchema = z.object({
  title: z.string(),
  description: z.string(),
  type: z.enum(TransactionTypeEnum),
});
export const updateTransactionSchema = createTransactionSchema.extend({
  id: IdSchema,
});

export type Id = z.infer<typeof IdSchema>;
export type ParamId = z.infer<typeof paramIdSchema>;
export type CreateTransactionDto = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionDto = z.infer<typeof updateTransactionSchema>;
