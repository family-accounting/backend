import { PartialType } from '@nestjs/mapped-types';

export class CreatePermissionDto {}
export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {}
