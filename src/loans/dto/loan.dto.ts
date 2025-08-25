import { z } from 'zod';
const loanSchema = z.object({
    id: z.string(),
    label: z.string().min(1).max(255),
    value: z.string().min(1).max(255),
    description: z.string().min(1).max(255).optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const idSchema = z.string().uuid();
export const valueSchema = z.string().min(1).max(255)
export const createLoanSchema = loanSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const updateLoanSchema = loanSchema.omit({ createdAt: true, updatedAt: true }).partial()

export type LoanDto = z.infer<typeof loanSchema>;
export type IdLoanDto = z.infer<typeof idSchema>;
export type ValueLoanDto = z.infer<typeof valueSchema>;
export type CreateLoanDto = z.infer<typeof createLoanSchema>;
export type UpdateLoanDto = z.infer<typeof updateLoanSchema>;