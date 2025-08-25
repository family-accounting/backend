import { z } from 'zod';
const sharedExpenseSchema = z.object({
    id: z.string(),
    label: z.string().min(1).max(255),
    value: z.string().min(1).max(255),
    description: z.string().min(1).max(255).optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const idSchema = z.string().uuid();
export const valueSchema = z.string().min(1).max(255)
export const createSharedExpenseSchema = sharedExpenseSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const updateSharedExpenseSchema = sharedExpenseSchema.omit({ createdAt: true, updatedAt: true }).partial()

export type SharedExpenseDto = z.infer<typeof sharedExpenseSchema>;
export type IdSharedExpenseDto = z.infer<typeof idSchema>;
export type ValueSharedExpenseDto = z.infer<typeof valueSchema>;
export type CreateSharedExpenseDto = z.infer<typeof createSharedExpenseSchema>;
export type UpdateSharedExpenseDto = z.infer<typeof updateSharedExpenseSchema>;