import { z } from 'zod';
const investmentSchema = z.object({
    id: z.string(),
    label: z.string().min(1).max(255),
    value: z.string().min(1).max(255),
    description: z.string().min(1).max(255).optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const idSchema = z.string().uuid();
export const valueSchema = z.string().min(1).max(255)
export const createInvestmentSchema = investmentSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const updateInvestmentSchema = investmentSchema.omit({ createdAt: true, updatedAt: true }).partial()

export type InvestmentDto = z.infer<typeof investmentSchema>;
export type IdInvestmentDto = z.infer<typeof idSchema>;
export type ValueInvestmentDto = z.infer<typeof valueSchema>;
export type CreateInvestmentDto = z.infer<typeof createInvestmentSchema>;
export type UpdateInvestmentDto = z.infer<typeof updateInvestmentSchema>;