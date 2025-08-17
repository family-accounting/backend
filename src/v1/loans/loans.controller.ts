import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller({
  path: 'loans',
  version: '1',
})
@UseGuards(JwtAuthGuard, RolesGuard)
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.MEMBER)
  create(@Body() createLoanDto: CreateLoanDto, @Request() req) {
    return this.loansService.create(createLoanDto, req.user.id, req.user.role);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.MEMBER, UserRole.VIEWER)
  findAll(@Request() req) {
    return this.loansService.findAll(req.user.id, req.user.role);
  }

  @Get('pending')
  @Roles(UserRole.ADMIN, UserRole.MEMBER, UserRole.VIEWER)
  getPendingLoans(@Request() req) {
    return this.loansService.getPendingLoans(req.user.id, req.user.role);
  }

  @Get('overdue')
  @Roles(UserRole.ADMIN, UserRole.MEMBER, UserRole.VIEWER)
  getOverdueLoans(@Request() req) {
    return this.loansService.getOverdueLoans(req.user.id, req.user.role);
  }

  @Get('summary')
  @Roles(UserRole.ADMIN, UserRole.MEMBER, UserRole.VIEWER)
  getLoanSummary(@Request() req) {
    return this.loansService.getLoanSummary(req.user.id, req.user.role);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.MEMBER, UserRole.VIEWER)
  findOne(@Param('id') id: string, @Request() req) {
    return this.loansService.findOne(id, req.user.id, req.user.role);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.MEMBER)
  update(
    @Param('id') id: string,
    @Body() updateLoanDto: UpdateLoanDto,
    @Request() req,
  ) {
    return this.loansService.update(
      id,
      updateLoanDto,
      req.user.id,
      req.user.role,
    );
  }

  @Patch(':id/mark-paid') 
  @Roles(UserRole.ADMIN, UserRole.MEMBER)
  markAsPaid(@Param('id') id: string, @Request() req) {
    return this.loansService.markAsPaid(id, req.user.id, req.user.role);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string, @Request() req) {
    return this.loansService.remove(id, req.user.id, req.user.role);
  }
}
