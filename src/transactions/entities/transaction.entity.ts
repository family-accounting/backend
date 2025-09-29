import { TransactionTypeEnum } from '@/common/enums';
import type {
  CreatedAt,
  Id,
  TransactionDate,
  UpdatedAt,
} from '@/common/types';
import { UserEntity } from '@/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'transactions' })
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: Id;

  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: TransactionTypeEnum })
  type: TransactionTypeEnum;

  @Column({ type: 'float', nullable: false , default: 0})
  amount: number;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  transactionDate: TransactionDate;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdAt: CreatedAt;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updatedAt: UpdatedAt;

  // relation width user
  @ManyToOne(() => UserEntity, (user) => user.transactions)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
