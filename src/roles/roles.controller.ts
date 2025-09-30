import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RolesService } from './roles.service';

import { createRoleSchema, paramIdSchema, updateRoleSchema, } from './dto/role.dto';
import type { ParamId, CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
import { ZodValidationPipe } from '@/common/pipes/zod-validation.pipe';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Post()
  create(@Body(new ZodValidationPipe(createRoleSchema)) createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param(new ZodValidationPipe(paramIdSchema)) { id }: ParamId) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  update(@Param(new ZodValidationPipe(paramIdSchema)) { id }: ParamId, @Body(new ZodValidationPipe(updateRoleSchema)) updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param(new ZodValidationPipe(paramIdSchema)) { id }: ParamId) {
    return this.rolesService.remove(id);
  }
}
