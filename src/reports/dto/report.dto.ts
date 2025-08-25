import { z } from 'zod';
const reportSchema = z.object({
    id: z.string(),
    label: z.string().min(1).max(255),
    value: z.string().min(1).max(255),
    description: z.string().min(1).max(255).optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const idSchema = z.string().uuid();
export const valueSchema = z.string().min(1).max(255)
export const createReportSchema = reportSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const updateReportSchema = reportSchema.omit({ createdAt: true, updatedAt: true }).partial()

export type ReportDto = z.infer<typeof reportSchema>;
export type IdReportDto = z.infer<typeof idSchema>;
export type ValueReportDto = z.infer<typeof valueSchema>;
export type CreateReportDto = z.infer<typeof createReportSchema>;
export type UpdateReportDto = z.infer<typeof updateReportSchema>;