import { z } from 'zod';
export const userSchema = z.object({
    id: z.string(),
    username: z.string().min(1).max(255),
    mobile: z.string().min(1).max(255),
    firstName: z.string().min(1).max(255).optional(),
    lastName: z.string().min(1).max(255).optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().optional(),
    tags: z.array(z.string()),
    accounts: z.array(z.string()),
    loans: z.array(z.string()),
    roles: z.array(z.string()),
    permissions: z.array(z.string()),
    transactions: z.array(z.string()),
    password: z.string().min(1).max(255),
});

export const paramSchema = z.object({
    id: z.string().uuid(),
    username: z.string().min(1).max(255),
    mobile: z.string().min(1).max(255),
})

export const createUserSchema = userSchema.pick({
    username: true,
    mobile: true,
    password: true,
    firstName: true,
    lastName: true,
})
export const updateUserSchema = userSchema.pick({
    id: true,
    username: true,
    mobile: true,
    password: true,
    firstName: true,
    lastName: true,
}).partial()

export type UserDto = z.infer<typeof userSchema>;
export type ParamUserDto = z.infer<typeof paramSchema>;
export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;