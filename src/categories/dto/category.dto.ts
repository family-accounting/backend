import { z } from 'zod';
const categorySchema = z.object({
    id: z.string(),
    label: z.string().min(1).max(255),
    value: z.string().min(1).max(255),
    description: z.string().min(1).max(255).optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const idSchema = z.string().uuid();
export const valueSchema = z.string().min(1).max(255)
export const createCategorySchema = categorySchema.omit({ id: true, createdAt: true, updatedAt: true });
export const updateCategorySchema = categorySchema.omit({ createdAt: true, updatedAt: true }).partial()

export type CategoryDto = z.infer<typeof categorySchema>;
export type IdCategoryDto = z.infer<typeof idSchema>;
export type ValueCategoryDto = z.infer<typeof valueSchema>;
export type CreateCategoryDto = z.infer<typeof createCategorySchema>;
export type UpdateCategoryDto = z.infer<typeof updateCategorySchema>;