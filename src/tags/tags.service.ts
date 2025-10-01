import { Injectable } from '@nestjs/common';
import type { CreateTagDto, Id, UpdateTagDto } from './dto/tag.dto';
import { TagEntity } from './entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nService } from 'nestjs-i18n';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
    private readonly i18n: I18nService,
  ) {}
  
  createOne(createTagDto: CreateTagDto) {
    const tag = this.tagRepository.create(createTagDto);
    return this.tagRepository.save(tag);
  }

  findAll() {
    return this.tagRepository.find();
  }

  findOneById(id: Id) {
    return this.tagRepository.findOneBy({id});
  }

  updateOneById(id: Id, updateTagDto: UpdateTagDto) {
    return this.tagRepository.update(id, updateTagDto);
  }

  deleteOneById(id: Id) {
    return this.tagRepository.delete(id);
  }
}
