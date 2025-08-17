import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from './entities/user.entity';

@Controller({
  path: 'users',
  version: '1',
})

@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.MEMBER)
  findAll() {
    return this.usersService.findAll();
  }

  @Get('family-members')
  @Roles(UserRole.ADMIN, UserRole.MEMBER, UserRole.VIEWER)
  getFamilyMembers() {
    return this.usersService.getFamilyMembers();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.MEMBER)
  findOne(@Param('id') id: string, @Request() req) {
    // Users can only access their own profile unless they're admin
    if (req.user.role !== UserRole.ADMIN && req.user.id !== id) {
      throw new Error('You can only access your own profile');
    }
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.MEMBER)
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    // Users can only update their own profile unless they're admin
    if (req.user.role !== UserRole.ADMIN && req.user.id !== id) {
      throw new Error('You can only update your own profile');
    }
    return this.usersService.update(id, updateUserDto);
  }

  @Patch(':id/role')
  @Roles(UserRole.ADMIN)
  changeRole(@Param('id') id: string, @Body('role') role: UserRole) {
    return this.usersService.changeRole(id, role);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
