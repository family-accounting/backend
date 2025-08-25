import { Module } from '@nestjs/common';
import { DebtsService } from './debts.service';
import { DebtsController } from './debts.controller';

@Module({
  controllers: [DebtsController],
  providers: [DebtsService],
})
export class DebtsModule {}
