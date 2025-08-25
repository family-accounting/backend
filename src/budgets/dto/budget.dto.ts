import { z } from 'zod';
const budgetSchema = z.object({
    id: z.string(),
    label: z.string().min(1).max(255),
    value: z.string().min(1).max(255),
    description: z.string().min(1).max(255).optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const idSchema = z.string().uuid();
export const valueSchema = z.string().min(1).max(255)
export const createBudgetSchema = budgetSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const updateBudgetSchema = budgetSchema.omit({ createdAt: true, updatedAt: true }).partial()

export type BudgetDto = z.infer<typeof budgetSchema>;
export type IdBudgetDto = z.infer<typeof idSchema>;
export type ValueBudgetDto = z.infer<typeof valueSchema>;
export type CreateBudgetDto = z.infer<typeof createBudgetSchema>;
export type UpdateBudgetDto = z.infer<typeof updateBudgetSchema>;