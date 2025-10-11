import { Injectable } from '@nestjs/common';
import type { CreateProfileDto, Id, UpdateProfileDto } from './dto/profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from './entities/profile.entity';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    private readonly i18n: I18nService,
  ) {}
  createOne(createProfileDto: CreateProfileDto) {
    const profile = this.profileRepository.create(createProfileDto);
    return this.profileRepository.save(profile);
  }

  findAll() {
    return this.profileRepository.find();
  }

  findOneById(id: Id) {
    return this.profileRepository.findOneBy({ id });
  }

  updateOneById(id: Id, updateProfileDto: UpdateProfileDto) {
    return this.profileRepository.update(id, updateProfileDto);
  }

  deleteOneById(id: Id) {
    return this.profileRepository.delete(id);
  }
}
