import { Injectable } from '@nestjs/common';
import type { CreateDebtDto, UpdateDebtDto } from './dto/debt.dto';

@Injectable()
export class DebtsService {
  create(createDebtDto: CreateDebtDto) {
    return 'This action adds a new debt';
  }

  findAll() {
    return `This action returns all debts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} debt`;
  }

  update(id: number, updateDebtDto: UpdateDebtDto) {
    return `This action updates a #${id} debt`;
  }

  remove(id: number) {
    return `This action removes a #${id} debt`;
  }
}
