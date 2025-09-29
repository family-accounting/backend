import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type {
  CreatedAt,
  Id,
  Mobile,
  Password,
  Role,
  Status,
  UpdatedAt,
} from '@/common/types';
import { RoleEnum, StatusEnum } from '@/common/enums';
import { BaseEntity } from 'typeorm/repository/BaseEntity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: Id;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 11, nullable: false, unique: true })
  mobile: Mobile;

  @Column({ type: 'varchar', length: 60, nullable: false })
  password: Password;

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.USER })
  role: Role;

  @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: Status;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdAt: CreatedAt;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updatedAt: UpdatedAt;
}
