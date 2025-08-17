import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction, TransactionType } from './entities/transaction.entity';
import { Account } from '../accounts/entities/account.entity';
import { User, UserRole } from '../users/entities/user.entity';
import { AccountsService } from '../accounts/accounts.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
    private accountsService: AccountsService,
    private dataSource: DataSource,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
    userId: string,
    userRole: UserRole,
  ): Promise<Transaction> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Validate account ownership
      const account = await this.accountsRepository.findOne({
        where: { id: createTransactionDto.accountId },
      });

      if (!account) {
        throw new NotFoundException('Account not found');
      }

      if (userRole !== UserRole.ADMIN && account.userId !== userId) {
        throw new ForbiddenException(
          'You can only create transactions for your own accounts',
        );
      }

      // Create transaction
      const transaction = this.transactionsRepository.create({
        ...createTransactionDto,
        sourceUserId: userId,
        transactionDate: new Date(createTransactionDto.transactionDate),
      });

      const savedTransaction = await queryRunner.manager.save(
        Transaction,
        transaction,
      );

      // Update account balance based on transaction type
      await this.updateAccountBalance(transaction, account, queryRunner);

      await queryRunner.commitTransaction();
      return savedTransaction;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async updateAccountBalance(
    transaction: Transaction,
    account: Account,
    queryRunner: any,
  ): Promise<void> {
    let balanceChange = 0;

    switch (transaction.type) {
      case TransactionType.INCOME:
        balanceChange = transaction.amount;
        break;
      case TransactionType.EXPENSE:
        balanceChange = -transaction.amount;
        break;
      case TransactionType.INTERNAL_TRANSFER:
        // For internal transfers, we need to update both accounts
        if (transaction.targetUserId) {
          const targetAccount = await this.accountsRepository.findOne({
            where: { id: transaction.accountId },
          });
          if (targetAccount) {
            targetAccount.balance += transaction.amount;
            await queryRunner.manager.save(Account, targetAccount);
          }
        }
        balanceChange = -transaction.amount;
        break;
      case TransactionType.LOAN:
        balanceChange = -transaction.amount;
        break;
      case TransactionType.REPAYMENT:
        balanceChange = transaction.amount;
        break;
    }

    account.balance += balanceChange;
    await queryRunner.manager.save(Account, account);
  }

  async findAll(userId: string, userRole: UserRole): Promise<Transaction[]> {
    if (userRole === UserRole.ADMIN) {
      return this.transactionsRepository.find({
        relations: ['sourceUser', 'targetUser', 'account'],
        order: { transactionDate: 'DESC' },
      });
    }

    return this.transactionsRepository.find({
      where: [{ sourceUserId: userId }, { targetUserId: userId }],
      relations: ['sourceUser', 'targetUser', 'account'],
      order: { transactionDate: 'DESC' },
    });
  }

  async findOne(
    id: string,
    userId: string,
    userRole: UserRole,
  ): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findOne({
      where: { id },
      relations: ['sourceUser', 'targetUser', 'account'],
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    if (
      userRole !== UserRole.ADMIN &&
      transaction.sourceUserId !== userId &&
      transaction.targetUserId !== userId
    ) {
      throw new ForbiddenException('You can only access your own transactions');
    }

    return transaction;
  }

  async update(
    id: string,
    updateTransactionDto: UpdateTransactionDto,
    userId: string,
    userRole: UserRole,
  ): Promise<Transaction> {
    const transaction = await this.findOne(id, userId, userRole);

    // Only allow updates for certain fields
    const allowedUpdates = ['description', 'transactionDate'];
    const filteredUpdates = Object.keys(updateTransactionDto)
      .filter((key) => allowedUpdates.includes(key))
      .reduce((obj, key) => {
        obj[key] = updateTransactionDto[key];
        return obj;
      }, {});

    Object.assign(transaction, filteredUpdates);
    return this.transactionsRepository.save(transaction);
  }

  async remove(id: string, userId: string, userRole: UserRole): Promise<void> {
    const transaction = await this.findOne(id, userId, userRole);

    if (userRole !== UserRole.ADMIN) {
      throw new ForbiddenException('Only admins can delete transactions');
    }

    await this.transactionsRepository.remove(transaction);
  }

  async getTransactionsByType(
    type: TransactionType,
    userId: string,
    userRole: UserRole,
  ): Promise<Transaction[]> {
    if (userRole === UserRole.ADMIN) {
      return this.transactionsRepository.find({
        where: { type },
        relations: ['sourceUser', 'targetUser', 'account'],
        order: { transactionDate: 'DESC' },
      });
    }

    return this.transactionsRepository.find({
      where: [
        { type, sourceUserId: userId },
        { type, targetUserId: userId },
      ],
      relations: ['sourceUser', 'targetUser', 'account'],
      order: { transactionDate: 'DESC' },
    });
  }

  async getTransactionsByDateRange(
    startDate: string,
    endDate: string,
    userId: string,
    userRole: UserRole,
  ): Promise<Transaction[]> {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (userRole === UserRole.ADMIN) {
      return this.transactionsRepository.find({
        where: {
          transactionDate: start,
        },
        relations: ['sourceUser', 'targetUser', 'account'],
        order: { transactionDate: 'DESC' },
      });
    }

    return this.transactionsRepository.find({
      where: [
        { sourceUserId: userId, transactionDate: start },
        { targetUserId: userId, transactionDate: start },
      ],
      relations: ['sourceUser', 'targetUser', 'account'],
      order: { transactionDate: 'DESC' },
    });
  }
}
