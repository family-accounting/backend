import { z } from 'zod';
const debtSchema = z.object({
    id: z.string(),
    label: z.string().min(1).max(255),
    value: z.string().min(1).max(255),
    description: z.string().min(1).max(255).optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const idSchema = z.string().uuid();
export const valueSchema = z.string().min(1).max(255)
export const createDebtSchema = debtSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const updateDebtSchema = debtSchema.omit({ createdAt: true, updatedAt: true }).partial()

export type DebtDto = z.infer<typeof debtSchema>;
export type IdDebtDto = z.infer<typeof idSchema>;
export type ValueDebtDto = z.infer<typeof valueSchema>;
export type CreateDebtDto = z.infer<typeof createDebtSchema>;
export type UpdateDebtDto = z.infer<typeof updateDebtSchema>;