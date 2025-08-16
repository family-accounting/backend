import { IsString, IsEnum, IsNumber, IsOptional, IsDateString, Min, IsUUID } from 'class-validator';
import { TransactionType } from '../entities/transaction.entity';

export class CreateTransactionDto {
  @IsEnum(TransactionType)
  type: TransactionType;

  @IsNumber()
  @Min(0.01)
  amount: number;

  @IsString()
  currency: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  exchangeRate?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  transactionDate: string;

  @IsUUID()
  accountId: string;

  @IsUUID()
  @IsOptional()
  targetUserId?: string;
}
