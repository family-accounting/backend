import { z } from 'zod';
const roleSchema = z.object({
    id: z.string(),
    label: z.string().min(1).max(255),
    value: z.string().min(1).max(255),
    description: z.string().min(1).max(255).optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const idSchema = z.string().uuid();
export const valueSchema = z.string().min(1).max(255)
export const createRoleSchema = roleSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const updateRoleSchema = roleSchema.omit({ createdAt: true, updatedAt: true }).partial()

export type RoleDto = z.infer<typeof roleSchema>;
export type IdRoleDto = z.infer<typeof idSchema>;
export type ValueRoleDto = z.infer<typeof valueSchema>;
export type CreateRoleDto = z.infer<typeof createRoleSchema>;
export type UpdateRoleDto = z.infer<typeof updateRoleSchema>;