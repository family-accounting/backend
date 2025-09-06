import { Injectable } from '@nestjs/common';
import {
  Id,
  CreateTransactionDto,
  UpdateTransactionDto,
} from './dto/transaction.dto';
import { Repository } from 'typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
  ) { }

  create(dto: CreateTransactionDto) {
    const transaction = this.transactionRepository.create(dto);
    return this.transactionRepository.save(transaction);
  }

  findAll() {
    return this.transactionRepository.find();
  }

  findById(id: Id) {
    return this.transactionRepository.findOneBy({ id });
  }

  updateById(id: Id, dto: UpdateTransactionDto) {
    return this.transactionRepository.update(id, dto);
  }

  deleteById(id: Id) {
    return this.transactionRepository.delete(id);
  }
}
