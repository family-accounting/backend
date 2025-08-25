import { z } from 'zod';
const permissionSchema = z.object({
    id: z.string(),
    label: z.string().min(1).max(255),
    value: z.string().min(1).max(255),
    description: z.string().min(1).max(255).optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const idSchema = z.string().uuid();
export const valueSchema = z.string().min(1).max(255)
export const createPermissionSchema = permissionSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const updatePermissionSchema = permissionSchema.omit({ createdAt: true, updatedAt: true }).partial()

export type PermissionDto = z.infer<typeof permissionSchema>;
export type IdPermissionDto = z.infer<typeof idSchema>;
export type ValuePermissionDto = z.infer<typeof valueSchema>;
export type CreatePermissionDto = z.infer<typeof createPermissionSchema>;
export type UpdatePermissionDto = z.infer<typeof updatePermissionSchema>;