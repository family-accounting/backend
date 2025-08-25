import { z } from 'zod';
const accountSchema = z.object({
    id: z.string(),
    label: z.string().min(1).max(255),
    value: z.string().min(1).max(255),
    description: z.string().min(1).max(255).optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const idSchema = z.string().uuid();
export const valueSchema = z.string().min(1).max(255)
export const createAccountSchema = accountSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const updateAccountSchema = accountSchema.omit({ createdAt: true, updatedAt: true }).partial()

export type PermissionDto = z.infer<typeof accountSchema>;
export type IdPermissionDto = z.infer<typeof idSchema>;
export type ValuePermissionDto = z.infer<typeof valueSchema>;
export type CreateAccountDto = z.infer<typeof createAccountSchema>;
export type UpdateAccountDto = z.infer<typeof updateAccountSchema>;