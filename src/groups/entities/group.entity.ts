import type { CreatedAt, Id, UpdatedAt } from '@/common/types';
import { UserEntity } from '@/users/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  Column,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';

@Entity({ name: 'groups' })
export class GroupEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: Id;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdAt: CreatedAt;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updatedAt: UpdatedAt;

  // relation with user
  @ManyToMany(() => UserEntity, (user) => user.groups)
  users: UserEntity[];

  // relation with user
  @ManyToOne(() => UserEntity, (user) => user.groups)
  @JoinColumn({ name: 'owner_id' })
  owner: UserEntity;
}
