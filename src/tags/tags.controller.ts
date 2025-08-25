import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TagsService } from './tags.service';
import { createTagSchema, paramSchema} from './dto/tag.dto';
import type { CreateTagDto, ParamTagDto, UpdateTagDto } from './dto/tag.dto';
import { ZodValidationPipe } from 'src/common/pipe/zod-validation.pipe';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) { }

  @Post()
  create(@Body(new ZodValidationPipe(createTagSchema)) dto: CreateTagDto) {
    return this.tagsService.create(dto);
  }

  @Get()
  findAll() {
    return this.tagsService.findAll();
  }

  @Get(':id')
  findOneById(@Param(new ZodValidationPipe(paramSchema)) param: ParamTagDto) {
    return this.tagsService.findOneById(param.id);
  }

  @Get('value/:value')
  findOneByValue(@Param(new ZodValidationPipe(paramSchema)) param: ParamTagDto) {
    return this.tagsService.findOneByValue(param.value);
  }

  @Patch(':id')
  updateOneById(@Param(new ZodValidationPipe(paramSchema)) param : ParamTagDto, @Body() dto: UpdateTagDto) {
    return this.tagsService.updateOneById(param.id, dto);
  }

  @Delete(':id')
  removeOneById(@Param(new ZodValidationPipe(paramSchema)) param: ParamTagDto) {
    return this.tagsService.removeOneById(param.id);
  }
}
