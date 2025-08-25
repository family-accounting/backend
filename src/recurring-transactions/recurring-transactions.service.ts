import { Injectable } from '@nestjs/common';
import type { CreateRecurringTransactionDto, UpdateRecurringTransactionDto } from './dto/recurring-transaction.dto';


@Injectable()
export class RecurringTransactionsService {
  create(createRecurringTransactionDto: CreateRecurringTransactionDto) {
    return 'This action adds a new recurringTransaction';
  }

  findAll() {
    return `This action returns all recurringTransactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recurringTransaction`;
  }

  update(id: number, updateRecurringTransactionDto: UpdateRecurringTransactionDto) {
    return `This action updates a #${id} recurringTransaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} recurringTransaction`;
  }
}
