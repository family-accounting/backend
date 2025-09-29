import { z } from 'zod';
import { RoleEnum, StatusEnum } from '../enums';

export const tokenSchema = z.jwt();
export const roleSchema = z.enum(RoleEnum);
export const statusSchema = z.enum(StatusEnum);
export const IdSchema = z.uuid();
export const mobileSchema = z.string().regex(/^09\d{9}$/);
export const usernameSchema = z.string();
export const passwordSchema = z
  .string()
  .min(2)
  .max(8)
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{2,8}$/,
  );
export const passwordConfirmSchema = z
  .string()
  .min(2)
  .max(8)
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{2,8}$/,
  );
export const createdAtSchema = z.iso.date();
export const updatedAtSchema = z.iso.date();
export const transactionDateSchema = z.iso.date();
export const emailSchema = z.email();
