import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type {
  CreatedAt,
  Id,
  Mobile,
  Password,
  UpdatedAt,
} from '@/common/types';
import { BaseEntity } from 'typeorm/repository/BaseEntity';
import { GroupEntity } from '@/groups/entities/group.entity';
import { ProfileEntity } from '@/profiles/entities/profile.entity';
import { TransactionEntity } from '@/transactions/entities/transaction.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: Id;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 11, nullable: false, unique: true })
  mobile: Mobile;

  @Column({ type: 'varchar', length: 60, nullable: false })
  password: Password;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdAt: CreatedAt;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updatedAt: UpdatedAt;


  // relation with profile
  @OneToOne(() => ProfileEntity, (profile) => profile.user)
  @JoinColumn({ name: 'profile_id' })
  profile: ProfileEntity;

  // relation with transaction
  @OneToMany(() => TransactionEntity, (transaction) => transaction.user)
  @JoinColumn({ name: 'transaction_id' })
  transactions: TransactionEntity[];

  // relation with group
  @ManyToMany(() => GroupEntity, (group) => group.users)
  groups: GroupEntity[];

}
