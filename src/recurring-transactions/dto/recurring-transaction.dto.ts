import { z } from 'zod';
const recurringTransactionSchema = z.object({
    id: z.string(),
    label: z.string().min(1).max(255),
    value: z.string().min(1).max(255),
    description: z.string().min(1).max(255).optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const idSchema = z.string().uuid();
export const valueSchema = z.string().min(1).max(255)
export const createRecurringTransactionSchema = recurringTransactionSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const updateRecurringTransactionSchema = recurringTransactionSchema.omit({ createdAt: true, updatedAt: true }).partial()

export type RecurringTransactionDto = z.infer<typeof recurringTransactionSchema>;
export type IdRecurringTransactionDto = z.infer<typeof idSchema>;
export type ValueRecurringTransactionDto = z.infer<typeof valueSchema>;
export type CreateRecurringTransactionDto = z.infer<typeof createRecurringTransactionSchema>;
export type UpdateRecurringTransactionDto = z.infer<typeof updateRecurringTransactionSchema>;