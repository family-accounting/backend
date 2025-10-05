import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { ZodValidationPipe } from '@/common/pipes/zod-validation.pipe';
import type { ParamId, CreateGroupDto } from './dto/group.dto';
import { paramIdSchema } from './schemas/group.schema';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Body() dto: CreateGroupDto) {
    return this.groupsService.create(dto);
  }

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  findById(@Param(new ZodValidationPipe(paramIdSchema)) { id }: ParamId) {
    return this.groupsService.findById(id);
  }

  @Patch(':id')
  updateById(
    @Param(new ZodValidationPipe(paramIdSchema)) { id }: ParamId,
    @Body() dto: CreateGroupDto,
  ) {
    return this.groupsService.updateById(id, dto);
  }

  @Delete(':id')
  deleteById(@Param(new ZodValidationPipe(paramIdSchema)) { id }: ParamId) {
    return this.groupsService.deleteById(id);
  }
}
