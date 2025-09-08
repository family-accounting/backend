import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { CreateUserDto, ParamId, UpdateUserDto } from './dto/user.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { createUserSchema, paramIdSchema } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(createUserSchema)) createUserDto: CreateUserDto,
  ) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findById(@Param(new ZodValidationPipe(paramIdSchema)) { id }: ParamId) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  updateById(
    @Param(new ZodValidationPipe(paramIdSchema)) { id }: ParamId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateById(id, updateUserDto);
  }

  @Delete(':id')
  deleteById(@Param(new ZodValidationPipe(paramIdSchema)) { id }: ParamId) {
    return this.usersService.deleteById(id);
  }
}
