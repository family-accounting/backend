import type { CreatedAt, Id, UpdatedAt } from '@/common/types';
import { TransactionEntity } from '@/transactions/entities/transaction.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  Entity,
} from 'typeorm';

@Entity({ name: 'tags' })
export class TagEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: Id;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdAt: CreatedAt;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updatedAt: UpdatedAt;

  // relation with transaction
  @ManyToOne(() => TransactionEntity, (transaction) => transaction.tags)
  @JoinColumn({ name: 'transaction_id' })
  transaction: TransactionEntity;
}
