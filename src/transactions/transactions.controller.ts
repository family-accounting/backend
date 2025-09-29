import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { ZodValidationPipe } from '@/common/pipes/zod-validation.pipe';
import type {
  ParamId,
  CreateTransactionDto,
  UpdateTransactionDto,
} from './dto/transaction.dto';
import { createTransactionSchema, paramIdSchema } from './dto/transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(createTransactionSchema))
    dto: CreateTransactionDto,
  ) {
    return this.transactionsService.create(dto);
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  findById(@Param(new ZodValidationPipe(paramIdSchema)) { id }: ParamId) {
    return this.transactionsService.findById(id);
  }

  @Patch(':id')
  updateById(
    @Param(new ZodValidationPipe(paramIdSchema)) { id }: ParamId,
    @Body() dto: UpdateTransactionDto,
  ) {
    return this.transactionsService.updateById(id, dto);
  }

  @Delete(':id')
  deleteById(@Param(new ZodValidationPipe(paramIdSchema)) { id }: ParamId) {
    return this.transactionsService.deleteById(id);
  }
}
