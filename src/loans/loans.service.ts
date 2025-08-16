import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { Loan, LoanStatus } from './entities/loan.entity';
import { User, UserRole } from '../users/entities/user.entity';
import { Account } from '../accounts/entities/account.entity';

@Injectable()
export class LoansService {
  constructor(
    @InjectRepository(Loan)
    private loansRepository: Repository<Loan>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
  ) {}

  async create(createLoanDto: CreateLoanDto, lenderId: string, userRole: UserRole): Promise<Loan> {
    // Validate borrower exists
    const borrower = await this.usersRepository.findOne({
      where: { id: createLoanDto.borrowerId },
    });

    if (!borrower) {
      throw new NotFoundException('Borrower not found');
    }

    // Validate account if provided
    if (createLoanDto.accountId) {
      const account = await this.accountsRepository.findOne({
        where: { id: createLoanDto.accountId },
      });

      if (!account) {
        throw new NotFoundException('Account not found');
      }

      if (userRole !== UserRole.ADMIN && account.userId !== lenderId) {
        throw new ForbiddenException('You can only create loans from your own accounts');
      }
    }

    const loan = this.loansRepository.create({
      ...createLoanDto,
      lenderId,
      dueDate: createLoanDto.dueDate ? new Date(createLoanDto.dueDate) : undefined,
    });

    return this.loansRepository.save(loan);
  }

  async findAll(userId: string, userRole: UserRole): Promise<Loan[]> {
    if (userRole === UserRole.ADMIN) {
      return this.loansRepository.find({
        relations: ['lender', 'borrower', 'account'],
        order: { createdAt: 'DESC' },
      });
    }

    return this.loansRepository.find({
      where: [
        { lenderId: userId },
        { borrowerId: userId },
      ],
      relations: ['lender', 'borrower', 'account'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, userId: string, userRole: UserRole): Promise<Loan> {
    const loan = await this.loansRepository.findOne({
      where: { id },
      relations: ['lender', 'borrower', 'account'],
    });

    if (!loan) {
      throw new NotFoundException(`Loan with ID ${id} not found`);
    }

    if (userRole !== UserRole.ADMIN && 
        loan.lenderId !== userId && 
        loan.borrowerId !== userId) {
      throw new ForbiddenException('You can only access your own loans');
    }

    return loan;
  }

  async update(id: string, updateLoanDto: UpdateLoanDto, userId: string, userRole: UserRole): Promise<Loan> {
    const loan = await this.findOne(id, userId, userRole);
    
    // Only allow certain updates based on role
    if (userRole === UserRole.ADMIN) {
      Object.assign(loan, updateLoanDto);
    } else {
      // Regular users can only update description and due date
      const allowedUpdates = ['description', 'dueDate'];
      const filteredUpdates = Object.keys(updateLoanDto)
        .filter(key => allowedUpdates.includes(key))
        .reduce((obj, key) => {
          obj[key] = updateLoanDto[key];
          return obj;
        }, {});

      Object.assign(loan, filteredUpdates);
    }

    if (updateLoanDto.dueDate) {
      loan.dueDate = new Date(updateLoanDto.dueDate);
    }

    return this.loansRepository.save(loan);
  }

  async remove(id: string, userId: string, userRole: UserRole): Promise<void> {
    const loan = await this.findOne(id, userId, userRole);
    
    if (userRole !== UserRole.ADMIN) {
      throw new ForbiddenException('Only admins can delete loans');
    }

    await this.loansRepository.remove(loan);
  }

  async markAsPaid(id: string, userId: string, userRole: UserRole): Promise<Loan> {
    const loan = await this.findOne(id, userId, userRole);
    
    if (loan.status === LoanStatus.PAID) {
      throw new BadRequestException('Loan is already marked as paid');
    }

    if (userRole !== UserRole.ADMIN && loan.lenderId !== userId) {
      throw new ForbiddenException('Only the lender or admin can mark a loan as paid');
    }

    loan.status = LoanStatus.PAID;
    loan.paidAt = new Date();

    return this.loansRepository.save(loan);
  }

  async getLoansByStatus(status: LoanStatus, userId: string, userRole: UserRole): Promise<Loan[]> {
    if (userRole === UserRole.ADMIN) {
      return this.loansRepository.find({
        where: { status },
        relations: ['lender', 'borrower', 'account'],
        order: { createdAt: 'DESC' },
      });
    }

    return this.loansRepository.find({
      where: [
        { status, lenderId: userId },
        { status, borrowerId: userId },
      ],
      relations: ['lender', 'borrower', 'account'],
      order: { createdAt: 'DESC' },
    });
  }

  async getPendingLoans(userId: string, userRole: UserRole): Promise<Loan[]> {
    return this.getLoansByStatus(LoanStatus.PENDING, userId, userRole);
  }

  async getOverdueLoans(userId: string, userRole: UserRole): Promise<Loan[]> {
    const today = new Date();
    
    if (userRole === UserRole.ADMIN) {
      return this.loansRepository.find({
        where: {
          status: LoanStatus.PENDING,
          dueDate: today,
        },
        relations: ['lender', 'borrower', 'account'],
        order: { dueDate: 'ASC' },
      });
    }

    return this.loansRepository.find({
      where: [
        { 
          status: LoanStatus.PENDING,
          dueDate: today,
          lenderId: userId,
        },
        { 
          status: LoanStatus.PENDING,
          dueDate: today,
          borrowerId: userId,
        },
      ],
      relations: ['lender', 'borrower', 'account'],
      order: { dueDate: 'ASC' },
    });
  }

  async getLoanSummary(userId: string, userRole: UserRole): Promise<{
    totalLent: number;
    totalBorrowed: number;
    pendingLent: number;
    pendingBorrowed: number;
  }> {
    const loans = await this.findAll(userId, userRole);
    
    const summary = {
      totalLent: 0,
      totalBorrowed: 0,
      pendingLent: 0,
      pendingBorrowed: 0,
    };

    loans.forEach(loan => {
      if (loan.lenderId === userId) {
        summary.totalLent += loan.amount;
        if (loan.status === LoanStatus.PENDING) {
          summary.pendingLent += loan.amount;
        }
      } else if (loan.borrowerId === userId) {
        summary.totalBorrowed += loan.amount;
        if (loan.status === LoanStatus.PENDING) {
          summary.pendingBorrowed += loan.amount;
        }
      }
    });

    return summary;
  }
}
