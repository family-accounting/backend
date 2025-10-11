import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import type { CreateTagDto, ParamId, UpdateTagDto } from './dto/tag.dto';
import { createTagSchema, paramIdSchema, updateTagSchema } from './dto/tag.dto';
import { ZodValidationPipe } from '@/common/pipes/zod-validation.pipe';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  createOne(
    @Body(new ZodValidationPipe(createTagSchema)) createTagDto: CreateTagDto,
  ) {
    return this.tagsService.createOne(createTagDto);
  }

  @Get()
  findAll() {
    return this.tagsService.findAll();
  }

  @Get(':id')
  findOneById(@Param(new ZodValidationPipe(paramIdSchema)) { id }: ParamId) {
    return this.tagsService.findOneById(id);
  }

  @Patch(':id')
  updateOneById(
    @Param(new ZodValidationPipe(paramIdSchema)) { id }: ParamId,
    @Body(new ZodValidationPipe(updateTagSchema)) updateTagDto: UpdateTagDto,
  ) {
    return this.tagsService.updateOneById(id, updateTagDto);
  }

  @Delete(':id')
  deleteOneById(@Param(new ZodValidationPipe(paramIdSchema)) { id }: ParamId) {
    return this.tagsService.deleteOneById(id);
  }
}
