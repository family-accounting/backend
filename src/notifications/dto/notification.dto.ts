import { z } from 'zod';
const notificationSchema = z.object({
    id: z.string(),
    label: z.string().min(1).max(255),
    value: z.string().min(1).max(255),
    description: z.string().min(1).max(255).optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const idSchema = z.string().uuid();
export const valueSchema = z.string().min(1).max(255)
export const createNotificationSchema = notificationSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const updateNotificationSchema = notificationSchema.omit({ createdAt: true, updatedAt: true }).partial()

export type NotificationDto = z.infer<typeof notificationSchema>;
export type IdNotificationDto = z.infer<typeof idSchema>;
export type ValueNotificationDto = z.infer<typeof valueSchema>;
export type CreateNotificationDto = z.infer<typeof createNotificationSchema>;
export type UpdateNotificationDto = z.infer<typeof updateNotificationSchema>;