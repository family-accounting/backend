import { BadRequestException, Injectable } from '@nestjs/common';
import type {
  CreatePermissionDto,
  UpdatePermissionDto,
} from './dto/permission.dto';
import { PermissionEntity } from './entities/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type{ Id } from '@/common/types';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>,
    private readonly i18n: I18nService,
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const existPermission = await this.permissionRepository.findOneBy({
      name: createPermissionDto.name,
    });
    if (existPermission) {
      const message = this.i18n.t('errors.duplicate_permission');
      throw new BadRequestException(message);
    }
    const permission = this.permissionRepository.create(createPermissionDto);
    return this.permissionRepository.save(permission);
  }

  findAll() {
    return this.permissionRepository.find();
  }

  findOne(id: Id) {
    return this.permissionRepository.findOneBy({ id });
  }

  update(id: Id, updatePermissionDto: UpdatePermissionDto) {
    return this.permissionRepository.update(id, updatePermissionDto);
  }

  remove(id: Id) {
    return this.permissionRepository.delete(id);
  }
}
