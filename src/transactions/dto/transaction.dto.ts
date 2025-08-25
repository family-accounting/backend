import { z } from 'zod';
const transactionSchema = z.object({
    id: z.string(),
    label: z.string().min(1).max(255),
    value: z.string().min(1).max(255),
    description: z.string().min(1).max(255).optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const idSchema = z.string().uuid();
export const valueSchema = z.string().min(1).max(255)
export const createTransactionSchema = transactionSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const updateTransactionSchema = transactionSchema.omit({ createdAt: true, updatedAt: true }).partial()

export type TransactionDto = z.infer<typeof transactionSchema>;
export type IdTransactionDto = z.infer<typeof idSchema>;
export type ValueTransactionDto = z.infer<typeof valueSchema>;
export type CreateTransactionDto = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionDto = z.infer<typeof updateTransactionSchema>;