import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import type { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { I18nService } from 'nestjs-i18n';
import { Id } from '@/common/types';

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    private readonly i18n: I18nService,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const existRole = await this.roleRepository.findOneBy({name:createRoleDto.name})
    if(existRole){
      const message = this.i18n.t('errors.duplicate_role')
      throw new BadRequestException(message)
    }
    const role = this.roleRepository.create(createRoleDto)

    return this.roleRepository.save(role);
  }

  findAll() {
    return this.roleRepository.find()
  }

  findOne(id: Id) {
    return this.roleRepository.findOneBy({id});
  }

  update(id: Id, updateRoleDto: UpdateRoleDto) {
    return this.roleRepository.update(id,updateRoleDto);
  }

  remove(id: Id) {
    return this.roleRepository.delete(id);
  }
}
