import { PartialType } from '@nestjs/mapped-types';
export class CreateWalletDto {}

export class UpdateWalletDto extends PartialType(CreateWalletDto) {}
