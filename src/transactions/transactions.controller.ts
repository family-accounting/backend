import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { TransactionType } from './entities/transaction.entity';

@Controller('transactions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.MEMBER)
  create(@Body() createTransactionDto: CreateTransactionDto, @Request() req) {
    return this.transactionsService.create(createTransactionDto, req.user.id, req.user.role);
  }

  @Post('internal-transfer')
  @Roles(UserRole.ADMIN)
  createInternalTransfer(@Body() createTransactionDto: CreateTransactionDto, @Request() req) {
    createTransactionDto.type = TransactionType.INTERNAL_TRANSFER;
    return this.transactionsService.create(createTransactionDto, req.user.id, req.user.role);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.MEMBER, UserRole.VIEWER)
  findAll(@Request() req) {
    return this.transactionsService.findAll(req.user.id, req.user.role);
  }

  @Get('by-type/:type')
  @Roles(UserRole.ADMIN, UserRole.MEMBER, UserRole.VIEWER)
  findByType(@Param('type') type: TransactionType, @Request() req) {
    return this.transactionsService.getTransactionsByType(type, req.user.id, req.user.role);
  }

  @Get('by-date-range')
  @Roles(UserRole.ADMIN, UserRole.MEMBER, UserRole.VIEWER)
  findByDateRange(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Request() req,
  ) {
    return this.transactionsService.getTransactionsByDateRange(startDate, endDate, req.user.id, req.user.role);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.MEMBER, UserRole.VIEWER)
  findOne(@Param('id') id: string, @Request() req) {
    return this.transactionsService.findOne(id, req.user.id, req.user.role);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.MEMBER)
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto, @Request() req) {
    return this.transactionsService.update(id, updateTransactionDto, req.user.id, req.user.role);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string, @Request() req) {
    return this.transactionsService.remove(id, req.user.id, req.user.role);
  }
}
