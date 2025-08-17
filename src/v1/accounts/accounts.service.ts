import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account, Currency } from './entities/account.entity';
import { User, UserRole } from '../users/entities/user.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
  ) {}

  async create(
    createAccountDto: CreateAccountDto,
    userId: string,
  ): Promise<Account> {
    const account = this.accountsRepository.create({
      ...createAccountDto,
      userId,
    });

    return this.accountsRepository.save(account);
  }

  async findAll(userId: string, userRole: UserRole): Promise<Account[]> {
    if (userRole === UserRole.ADMIN) {
      return this.accountsRepository.find({
        relations: ['user'],
        order: { createdAt: 'DESC' },
      });
    }

    return this.accountsRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(
    id: string,
    userId: string,
    userRole: UserRole,
  ): Promise<Account> {
    const account = await this.accountsRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }

    if (userRole !== UserRole.ADMIN && account.userId !== userId) {
      throw new ForbiddenException('You can only access your own accounts');
    }

    return account;
  }

  async update(
    id: string,
    updateAccountDto: UpdateAccountDto,
    userId: string,
    userRole: UserRole,
  ): Promise<Account> {
    const account = await this.findOne(id, userId, userRole);

    Object.assign(account, updateAccountDto);
    return this.accountsRepository.save(account);
  }

  async remove(id: string, userId: string, userRole: UserRole): Promise<void> {
    const account = await this.findOne(id, userId, userRole);
    await this.accountsRepository.remove(account);
  }

  async updateBalance(
    accountId: string,
    amount: number,
    operation: 'add' | 'subtract',
  ): Promise<Account> {
    const account = await this.accountsRepository.findOne({
      where: { id: accountId },
    });

    if (!account) {
      throw new NotFoundException(`Account with ID ${accountId} not found`);
    }

    if (operation === 'add') {
      account.balance += amount;
    } else {
      account.balance -= amount;
    }

    return this.accountsRepository.save(account);
  }

  async getAccountsByCurrency(
    currency: string,
    userId: string,
    userRole: UserRole,
  ): Promise<Account[]> {
    if (userRole === UserRole.ADMIN) {
      return this.accountsRepository.find({
        where: { currency: currency as Currency },
        relations: ['user'],
      });
    }

    return this.accountsRepository.find({
      where: { currency: currency as Currency, userId },
    });
  }

  async getTotalBalanceByCurrency(
    currency: string,
    userId: string,
    userRole: UserRole,
  ): Promise<number> {
    const accounts = await this.getAccountsByCurrency(
      currency,
      userId,
      userRole,
    );
    return accounts.reduce(
      (total, account) => total + Number(account.balance),
      0,
    );
  }
}
