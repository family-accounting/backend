import { Injectable } from '@nestjs/common';
import type { CreateSharedExpenseDto, UpdateSharedExpenseDto } from './dto/shared-expense.dto';

@Injectable()
export class SharedExpensesService {
  create(createSharedExpenseDto: CreateSharedExpenseDto) {
    return 'This action adds a new sharedExpense';
  }

  findAll() {
    return `This action returns all sharedExpenses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sharedExpense`;
  }

  update(id: number, updateSharedExpenseDto: UpdateSharedExpenseDto) {
    return `This action updates a #${id} sharedExpense`;
  }

  remove(id: number) {
    return `This action removes a #${id} sharedExpense`;
  }
}
