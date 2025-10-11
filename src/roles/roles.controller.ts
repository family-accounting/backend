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

import {
  createRoleSchema,
  paramIdSchema,
  updateRoleSchema,
} from './dto/role.dto';
import type { ParamId, CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
import { ZodValidationPipe } from '@/common/pipes/zod-validation.pipe';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  createOne(
    @Body(new ZodValidationPipe(createRoleSchema)) createRoleDto: CreateRoleDto,
  ) {
    return this.rolesService.createOne(createRoleDto);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOneById(@Param(new ZodValidationPipe(paramIdSchema)) { id }: ParamId) {
    return this.rolesService.findOneById(id);
  }

  @Patch(':id')
  updateOneById(
    @Param(new ZodValidationPipe(paramIdSchema)) { id }: ParamId,
    @Body(new ZodValidationPipe(updateRoleSchema)) updateRoleDto: UpdateRoleDto,
  ) {
    return this.rolesService.updateOneById(id, updateRoleDto);
  }

  @Delete(':id')
  deleteOneById(@Param(new ZodValidationPipe(paramIdSchema)) { id }: ParamId) {
    return this.rolesService.deleteOneById(id);
  }
}
