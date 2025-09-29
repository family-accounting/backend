import { PartialType } from '@nestjs/mapped-types';
export class CreateTagDto {}
export class UpdateTagDto extends PartialType(CreateTagDto) {}
