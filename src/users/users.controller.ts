import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserSchema, paramSchema } from './dto/user.dto';
import type { ParamUserDto, CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { ZodValidationPipe } from 'src/common/pipe/zod-validation.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body(new ZodValidationPipe(createUserSchema)) dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOneById(@Param(new ZodValidationPipe(paramSchema)) params: ParamUserDto) {
    return this.usersService.findOneById(params.id);
  }

  @Patch(':id')
  updateOneById(@Param(new ZodValidationPipe(paramSchema)) params: ParamUserDto, @Body() dto: UpdateUserDto) {
    return this.usersService.updateOneById(params.id, dto);
  }

  @Delete(':id')
  removeOneById(@Param(new ZodValidationPipe(paramSchema)) params: ParamUserDto) {
    return this.usersService.removeOneById(params.id);
  }
}
