import type { CreatedAt, Id, UpdatedAt } from '@/common/types';
import { UserEntity } from '@/users/entities/user.entity';
import { CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'groups' })
export class GroupEntity {
  @PrimaryGeneratedColumn('uuid')
  id: Id;


  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdAt: CreatedAt;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updatedAt: UpdatedAt;


  // relation with user
  @ManyToMany(() => UserEntity, (user) => user.groups)
  users: UserEntity[];
}
