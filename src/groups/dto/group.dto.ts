import { z } from 'zod';
import {
  mobileSchema,
  IdSchema,
  usernameSchema,
  passwordSchema,
  passwordConfirmSchema,
  roleSchema,
  statusSchema,
} from '../../common/schemas';

export class CreateGroupDto {}
export const paramIdSchema = z.object({
  id: IdSchema,
});

export const createUserSchema = z
  .object({
    mobile: mobileSchema,
    password: passwordSchema,
    passwordConfirm: passwordConfirmSchema,
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords do not match',
    path: ['passwordConfirm'],
  });

export const updateUserSchema = z
  .object({
    username: usernameSchema,
    mobile: mobileSchema,
    password: passwordSchema,
    passwordConfirm: passwordConfirmSchema,
    role: roleSchema,
    status: statusSchema,
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords do not match',
    path: ['passwordConfirm'],
  });

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
export type ParamId = z.infer<typeof paramIdSchema>;
