import { TransactionTypeEnum } from '@/common/enums';
import type { CreatedAt, Id, TransactionDate, UpdatedAt } from '@/common/types';
import { GroupEntity } from '@/groups/entities/group.entity';
import { TagEntity } from '@/tags/entities/tag.entity';
import { UserEntity } from '@/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'transactions' })
export class TransactionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: Id;

  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: TransactionTypeEnum })
  type: TransactionTypeEnum;

  @Column({ type: 'float', nullable: false, default: 0 })
  amount: number;

  @Column({ type: 'timestamp', nullable: false })
  transactionDate: TransactionDate;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdAt: CreatedAt;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updatedAt: UpdatedAt;

  // relation width user
  @ManyToOne(() => UserEntity, (user) => user.transactions)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  // relation with tag
  @ManyToMany(() => TagEntity, (tag) => tag.transactions)
  tags: TagEntity[];

  // relation with group
  @ManyToOne(() => GroupEntity, (group) => group.transactions)
  group: GroupEntity;
}
