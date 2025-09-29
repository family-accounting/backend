import { PartialType } from '@nestjs/mapped-types';

export class CreateInvitationDto {}
export class UpdateInvitationDto extends PartialType(CreateInvitationDto) {}
