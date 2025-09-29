import { PartialType } from '@nestjs/mapped-types';

export class CreateProfileDto {}
export class UpdateProfileDto extends PartialType(CreateProfileDto) {}
