import { IsString, IsEnum, IsOptional, IsNumber, Min } from 'class-validator';
import { AccountType, Currency } from '../entities/account.entity';

export class CreateAccountDto {
  @IsString()
  name: string;

  @IsEnum(AccountType)
  type: AccountType;

  @IsEnum(Currency)
  currency: Currency;

  @IsNumber()
  @Min(0)
  @IsOptional()
  balance?: number;

  @IsString()
  @IsOptional()
  description?: string;
}
