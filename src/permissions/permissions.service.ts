import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import type { CreatePermissionDto, IdPermissionDto, UpdatePermissionDto } from './dto/permission.dto';
import { PermissionEntity } from './entities/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionsRepository: Repository<PermissionEntity>
  ) { }

  async create(dto: CreatePermissionDto) {
    const exists = await this.permissionsRepository.existsBy({ value: dto.value });
    if (exists) {
      throw new BadRequestException('Permission value already exists');
    }
    const permission = this.permissionsRepository.create(dto);
    return this.permissionsRepository.save(permission);
  }

  async findAll() {
    return await this.permissionsRepository.find();
  }

  async findOneById(id: IdPermissionDto) {
    const permission = await this.permissionsRepository.findOneBy({ id });
    if (!permission) throw new NotFoundException('Permission not found');
    return permission;
  }

  async updateOneById(id: IdPermissionDto, dto: UpdatePermissionDto) {
    const permission = await this.permissionsRepository.findOneBy({ id });
    if (!permission) throw new NotFoundException('Permission not found');
    return await this.permissionsRepository.update(id, dto);
  }

  async removeById(id: IdPermissionDto) {
    const permission = await this.permissionsRepository.findOneBy({ id });
    if (!permission) throw new NotFoundException('Permission not found');
    return await this.permissionsRepository.softDelete(id);
  }
}
