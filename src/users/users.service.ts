import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) { }

  async create(dto: CreateUserDto) {
    const exists = await this.usersRepository.existsBy({ mobile: dto.mobile });
    if (exists) {
      throw new BadRequestException('User mobile already exists');
    }

    const user = this.usersRepository.create(dto);
    return this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOneById(id: UserDto['id']) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByMobile(mobile: string) {
    return await this.usersRepository.findOneBy({ mobile });
  }

  async updateOneById(id: UserDto['id'], dto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return await this.usersRepository.update(id, dto);
  }

  async removeOneById(id: UserDto['id']) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return await this.usersRepository.softDelete(id);
  }
}
