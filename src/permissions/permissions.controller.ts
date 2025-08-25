import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import type { CreatePermissionDto, UpdatePermissionDto, IdPermissionDto } from './dto/permission.dto';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) { }

  @Post()
  create(@Body() dto: CreatePermissionDto) {
    return this.permissionsService.create(dto);
  }

  @Get()
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: IdPermissionDto) {
    return this.permissionsService.findOneById(id);
  }

  @Patch(':id')
  updateOneById(@Param('id') id: IdPermissionDto, @Body() dto: UpdatePermissionDto) {
    return this.permissionsService.updateOneById(id, dto);
  }

  @Delete(':id')
  removeById(@Param('id') id: IdPermissionDto) {
    return this.permissionsService.removeById(id);
  }
}
