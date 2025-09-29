import { BadRequestException, Injectable } from '@nestjs/common';
import type { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import type { Id, Mobile } from '@/common/types';
import { BcryptService } from '@/common/services/bcrypt.service';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly bcryptService: BcryptService,
    private readonly i18n: I18nService,
  ) {}

  async create(dto: CreateUserDto) {
    const existMobile = await this.userRepository.existsBy({
      mobile: dto.mobile,
    });
    if (existMobile) {
      const message = this.i18n.t('errors.duplicate_mobile');
      throw new BadRequestException(message);
    }
    const user = this.userRepository.create(dto);
    const hashedPassword = this.bcryptService.hash(dto.password);
    user.password = hashedPassword;
    return this.userRepository.save(user);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findById(id: Id) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      const message = this.i18n.t('errors.user_not_found');
      throw new BadRequestException(message);
    }
    return user;
  }

  async findByMobile(mobile: Mobile) {
    const user = await this.userRepository.findOneBy({ mobile });
    if (!user) {
      const message = this.i18n.t('errors.user_not_found');
      throw new BadRequestException(message);
    }
    return user;
  }

  async updateById(id: Id, dto: UpdateUserDto) {
    await this.findById(id);
    return this.userRepository.update(id, dto);
  }

  async deleteById(id: Id) {
    await this.findById(id);
    return this.userRepository.delete(id);
  }
}
