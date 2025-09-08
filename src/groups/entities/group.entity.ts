import type { Id } from '@/common/types';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'groups' })
export class GroupEntity {
  @PrimaryGeneratedColumn('uuid')
  id: Id;
}
