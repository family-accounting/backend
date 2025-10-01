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
  createOne(
    @Body(new ZodValidationPipe(createTransactionSchema))
    dto: CreateTransactionDto,
  ) {
    return this.transactionsService.createOne(dto);
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  findOneById(@Param(new ZodValidationPipe(paramIdSchema)) { id }: ParamId) {
    return this.transactionsService.findOneById(id);
  }

  @Patch(':id')
  updateOneById(
    @Param(new ZodValidationPipe(paramIdSchema)) { id }: ParamId,
    @Body() dto: UpdateTransactionDto,
  ) {
    return this.transactionsService.updateOneById(id, dto);
  }

  @Delete(':id')
  deleteOneById(@Param(new ZodValidationPipe(paramIdSchema)) { id }: ParamId) {
    return this.transactionsService.deleteOneById(id);
  }
}
