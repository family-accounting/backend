import { Module } from '@nestjs/common';
import { SharedExpensesService } from './shared-expenses.service';
import { SharedExpensesController } from './shared-expenses.controller';

@Module({
  controllers: [SharedExpensesController],
  providers: [SharedExpensesService],
})
export class SharedExpensesModule {}
