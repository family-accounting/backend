import { Injectable } from '@nestjs/common';
import {
  Id,
  CreateTransactionDto,
  UpdateTransactionDto,
} from './dto/transaction.dto';

@Injectable()
export class TransactionsService {
  create(dto: CreateTransactionDto) {
    return dto;
  }

  findAll() {
    return `This action returns all transactions`;
  }

  findById(id: Id) {
    return `This action returns a #${id} transaction`;
  }

  updateById(id: Id, dto: UpdateTransactionDto) {
    return { id, dto };
  }

  deleteById(id: Id) {
    return `This action removes a #${id} transaction`;
  }
}
