import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/group.dto';
import { Id } from '@/common/types';
import { Repository } from 'typeorm';
import { GroupEntity } from './entities/group.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly repo: Repository<GroupEntity>,
  ) {}
  create(dto: CreateGroupDto) {
    return 'This action adds a new group';
  }

  findAll() {
    return this.repo.find();
  }

  findById(id: Id) {
    return this.repo.findOneBy({ id });
  }

  updateById(id: Id, dto: CreateGroupDto) {
    return this.repo.update(id, dto);
  }

  deleteById(id: Id) {
    return `This action removes a #${id} group`;
  }
}
