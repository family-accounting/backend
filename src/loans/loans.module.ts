import { Module } from '@nestjs/common';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanEntity } from './entities/loan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LoanEntity])],
  controllers: [LoansController],
  providers: [LoansService],
})
export class LoansModule {}
