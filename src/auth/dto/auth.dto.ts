import { z } from 'zod';
import {userSchema ,createUserSchema} from '../../users/dto/user.dto'



export const loginAuthSchema = userSchema.pick({
    mobile: true,
    password: true
})
export const registerAuthSchema = createUserSchema

export type LoginAuthDto = z.infer<typeof loginAuthSchema>;
export type RegisterAuthDto = z.infer<typeof registerAuthSchema>;