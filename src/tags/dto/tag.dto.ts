import { z } from 'zod';
const tagSchema = z.object({
    id: z.string(),
    label: z.string().min(1).max(255),
    value: z.string().min(1).max(255),
    description: z.string().min(1).max(255).optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().optional(),
    transactions: z.array(z.string()),
});

export const paramSchema = z.object({
    id: z.string().uuid(),
    value: z.string().min(1).max(255),
})

export const createTagSchema = tagSchema.omit({ id: true, createdAt: true, updatedAt: true, deletedAt: true, transactions: true });
export const updateTagSchema = tagSchema.omit({ createdAt: true, updatedAt: true, deletedAt: true, transactions: true }).partial()

export type TagDto = z.infer<typeof tagSchema>;
export type ParamTagDto = z.infer<typeof paramSchema>;
export type CreateTagDto = z.infer<typeof createTagSchema>;
export type UpdateTagDto = z.infer<typeof updateTagSchema>;