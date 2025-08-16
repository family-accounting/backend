import { IsString, IsEnum, IsNumber, IsOptional, IsDateString, Min, IsUUID } from 'class-validator';
import { LoanStatus } from '../entities/loan.entity';

export class CreateLoanDto {
  @IsNumber()
  @Min(0.01)
  amount: number;

  @IsString()
  currency: string;

  @IsEnum(LoanStatus)
  @IsOptional()
  status?: LoanStatus;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsUUID()
  borrowerId: string;

  @IsUUID()
  @IsOptional()
  accountId?: string;
}
