import { z } from 'zod';
import {
  mobileSchema,
  IdSchema,
  usernameSchema,
  passwordSchema,
  passwordConfirmSchema,
  roleSchema,
  statusSchema,
} from '@/common/schemas';

export const paramIdSchema = z.object({
  id: IdSchema,
});

export const paramNameSchema = z.object({
  name: z.string(),
});

export const createPermissionSchema = z
  .object({
    name: z.string(),
    description: z.string().optional(),
  });

export const updatePermissionSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
  });

export type CreatePermissionDto = z.infer<typeof createPermissionSchema>;
export type UpdatePermissionDto = z.infer<typeof updatePermissionSchema>;
export type ParamId = z.infer<typeof paramIdSchema>;
export type ParamName = z.infer<typeof paramNameSchema>;


// export class CreatePermissionDto {
//     @IsString()
//     @IsNotEmpty()
//     name: string;

//     @IsString()
//     @IsOptional()
//     description: string;
// }
// export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {}
