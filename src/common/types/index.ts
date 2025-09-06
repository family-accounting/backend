import type { z } from 'zod';
import type {
  IdSchema,
  mobileSchema,
  passwordSchema,
  passwordConfirmSchema,
  tokenSchema,
  statusSchema,
  roleSchema,
  updatedAtSchema,
  createdAtSchema,
  transactionDateSchema,
} from '../schemas/index';

export type Token = z.infer<typeof tokenSchema>;
export type Id = z.infer<typeof IdSchema>;
export type Mobile = z.infer<typeof mobileSchema>;
export type Password = z.infer<typeof passwordSchema>;
export type PasswordConfirm = z.infer<typeof passwordConfirmSchema>;
export type Role = z.infer<typeof roleSchema>;
export type Status = z.infer<typeof statusSchema>;
export type CreatedAt = z.infer<typeof createdAtSchema>;
export type UpdatedAt = z.infer<typeof updatedAtSchema>;
export type TransactionDate = z.infer<typeof transactionDateSchema>;

export type AccessTokenPayload = {
  id: string;
};
