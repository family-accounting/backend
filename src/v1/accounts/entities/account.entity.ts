import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';

export enum AccountType {
  CASH = 'CASH',
  BANK = 'BANK',
}

export enum Currency {
  IRR = 'IRR',
  USD = 'USD',
  EUR = 'EUR',
  INR = 'INR',
}

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: AccountType,
    default: AccountType.CASH,
  })
  type: AccountType;

  @Column({
    type: 'enum',
    enum: Currency,
    default: Currency.IRR,
  })
  currency: Currency;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  balance: number;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => User, (user) => user.accounts)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];
}
