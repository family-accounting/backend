import { TransactionTypeEnum } from '@/common/enums';
import type {
  CreatedAt,
  Id,
  TransactionDate,
  UpdatedAt,
} from '@/common/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'transactions' })
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: Id;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: TransactionTypeEnum })
  type: TransactionTypeEnum;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  transactionDate: TransactionDate;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdAt: CreatedAt;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updatedAt: UpdatedAt;
}
