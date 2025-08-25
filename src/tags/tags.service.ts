import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import type { CreateTagDto, TagDto, UpdateTagDto } from './dto/tag.dto';
import { TagEntity } from './entities/tag.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagsService {

  constructor(
    @InjectRepository(TagEntity)
    private readonly tagsRepository: Repository<TagEntity>
  ) { }


  async create(dto: CreateTagDto) {
    const exists = await this.tagsRepository.existsBy({ value: dto.value });
    if (exists) {
      throw new BadRequestException('Tag value already exists');
    }
    const tag = this.tagsRepository.create(dto);
    return this.tagsRepository.save(tag);

  }

  async findAll() {
    return await this.tagsRepository.find();
  }

  async findOneById(id: TagDto['id']) {
    const tag = await this.tagsRepository.findOneBy({ id });
    if (!tag) throw new NotFoundException('Tag not found');
    return tag;
  }


  async findOneByValue(value: TagDto['value']) {
    const tag = await this.tagsRepository.findOneBy({ value });
    if (!tag) throw new NotFoundException('Tag not found');
    return tag;
  }

  async updateOneById(id: TagDto['id'], dto: UpdateTagDto) {
    const tag = await this.tagsRepository.findOneBy({ id });
    if (!tag) throw new NotFoundException('Tag not found');
    return await this.tagsRepository.update(id, dto);
  }

  async removeOneById(id: TagDto['id']) {
    const tag = await this.tagsRepository.findOneBy({ id });
    if (!tag) throw new NotFoundException('Tag not found');
    return await this.tagsRepository.softDelete(id);
  }

}
