import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import type {
  CreatePermissionDto,
  ParamId,
  UpdatePermissionDto,
} from './dto/permission.dto';
import {
  paramIdSchema,
  createPermissionSchema,
  updatePermissionSchema,
} from './dto/permission.dto';
import { ZodValidationPipe } from '@/common/pipes/zod-validation.pipe';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) { }

  @Post()
  create(@Body(new ZodValidationPipe(createPermissionSchema)) createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  findOne(@Param(new ZodValidationPipe(paramIdSchema)) { id }: ParamId) {
    return this.permissionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param(new ZodValidationPipe(paramIdSchema)) { id }: ParamId,
    @Body(new ZodValidationPipe(updatePermissionSchema)) updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionsService.update(id, updatePermissionDto);
  }

  @Delete(':id')
  remove(@Param(new ZodValidationPipe(paramIdSchema)) { id }: ParamId) {
    return this.permissionsService.remove(id);
  }
}
