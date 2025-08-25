import { z } from 'zod';
const goalSchema = z.object({
    id: z.string(),
    label: z.string().min(1).max(255),
    value: z.string().min(1).max(255),
    description: z.string().min(1).max(255).optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const idSchema = z.string().uuid();
export const valueSchema = z.string().min(1).max(255)
export const createGoalSchema = goalSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const updateGoalSchema = goalSchema.omit({ createdAt: true, updatedAt: true }).partial()

export type GoalDto = z.infer<typeof goalSchema>;
export type IdGoalDto = z.infer<typeof idSchema>;
export type ValueGoalDto = z.infer<typeof valueSchema>;
export type CreateGoalDto = z.infer<typeof createGoalSchema>;
export type UpdateGoalDto = z.infer<typeof updateGoalSchema>;