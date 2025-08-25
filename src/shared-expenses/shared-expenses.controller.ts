import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SharedExpensesService } from './shared-expenses.service';
import type { CreateSharedExpenseDto, UpdateSharedExpenseDto } from './dto/shared-expense.dto';

@Controller('shared-expenses')
export class SharedExpensesController {
  constructor(private readonly sharedExpensesService: SharedExpensesService) {}

  @Post()
  create(@Body() createSharedExpenseDto: CreateSharedExpenseDto) {
    return this.sharedExpensesService.create(createSharedExpenseDto);
  }

  @Get()
  findAll() {
    return this.sharedExpensesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sharedExpensesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSharedExpenseDto: UpdateSharedExpenseDto) {
    return this.sharedExpensesService.update(+id, updateSharedExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sharedExpensesService.remove(+id);
  }
}
