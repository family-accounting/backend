import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('accounts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.MEMBER)
  create(@Body() createAccountDto: CreateAccountDto, @Request() req) {
    return this.accountsService.create(createAccountDto, req.user.id);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.MEMBER, UserRole.VIEWER)
  findAll(@Request() req) {
    return this.accountsService.findAll(req.user.id, req.user.role);
  }

  @Get('by-currency/:currency')
  @Roles(UserRole.ADMIN, UserRole.MEMBER, UserRole.VIEWER)
  findByCurrency(@Param('currency') currency: string, @Request() req) {
    return this.accountsService.getAccountsByCurrency(currency, req.user.id, req.user.role);
  }

  @Get('balance/:currency')
  @Roles(UserRole.ADMIN, UserRole.MEMBER, UserRole.VIEWER)
  getTotalBalanceByCurrency(@Param('currency') currency: string, @Request() req) {
    return this.accountsService.getTotalBalanceByCurrency(currency, req.user.id, req.user.role);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.MEMBER, UserRole.VIEWER)
  findOne(@Param('id') id: string, @Request() req) {
    return this.accountsService.findOne(id, req.user.id, req.user.role);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.MEMBER)
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto, @Request() req) {
    return this.accountsService.update(id, updateAccountDto, req.user.id, req.user.role);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.MEMBER)
  remove(@Param('id') id: string, @Request() req) {
    return this.accountsService.remove(id, req.user.id, req.user.role);
  }
}
