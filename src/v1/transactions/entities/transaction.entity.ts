import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Account } from '../../accounts/entities/account.entity';

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
  INTERNAL_TRANSFER = 'INTERNAL_TRANSFER',
  LOAN = 'LOAN',
  REPAYMENT = 'REPAYMENT',
}

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  type: TransactionType;

  @Column('decimal', { precision: 15, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: ['IRR', 'USD', 'EUR', 'INR'],
  })
  currency: string;

  @Column('decimal', { precision: 10, scale: 4, nullable: true })
  exchangeRate: number;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'date' })
  transactionDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => User, (user) => user.sourceTransactions)
  @JoinColumn({ name: 'sourceUserId' })
  sourceUser: User;

  @Column()
  sourceUserId: string;

  @ManyToOne(() => User, (user) => user.targetTransactions, { nullable: true })
  @JoinColumn({ name: 'targetUserId' })
  targetUser: User;

  @Column({ nullable: true })
  targetUserId: string;

  @ManyToOne(() => Account, (account) => account.transactions)
  @JoinColumn({ name: 'accountId' })
  account: Account;

  @Column()
  accountId: string;
}
