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
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  createOne(
    @Body(new ZodValidationPipe(createPermissionSchema))
    createPermissionDto: CreatePermissionDto,
  ) {
    return this.permissionsService.createOne(createPermissionDto);
  }

  @Get()
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  findOneById(@Param(new ZodValidationPipe(paramIdSchema)) { id }: ParamId) {
    return this.permissionsService.findOneById(id);
  }

  @Patch(':id')
  updateOneById(
    @Param(new ZodValidationPipe(paramIdSchema)) { id }: ParamId,
    @Body(new ZodValidationPipe(updatePermissionSchema))
    updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionsService.updateOneById(id, updatePermissionDto);
  }

  @Delete(':id')
  deleteOneById(@Param(new ZodValidationPipe(paramIdSchema)) { id }: ParamId) {
    return this.permissionsService.deleteOneById(id);
  }
}
