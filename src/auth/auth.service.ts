import { BadRequestException, Injectable } from '@nestjs/common';
import type { LoginAuthDto, RegisterAuthDto } from './dto/auth.dto';
import { UsersService } from '@/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Mobile, Password } from '@/common/types';
import { BcryptService } from '@/common/services/bcrypt.service';
import { pick } from 'lodash';
import { UserEntity } from '@/users/entities/user.entity';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
    private readonly i18n: I18nService,
  ) {}

  async register(dto: RegisterAuthDto) {
    const user = await this.userService.createOne(dto);
    const token = await this.jwtService.signAsync({
      id: user,
      mobile: user.mobile,
      // role: user.role,
    });
    const obj = pick<UserEntity>(user, ['id', 'mobile', 'role']);
    return { ...obj, token };
  }

  async login(dto: LoginAuthDto) {
    const user = await this.validate(dto.mobile, dto.password);
    const token = await this.jwtService.signAsync({
      id: user,
      mobile: user.mobile,
      // role: user.role,
    });
    const obj = pick<UserEntity>(user, ['id', 'mobile', 'role']);
    return { ...obj, token };
  }

  async validate(mobile: Mobile, password: Password) {
    const user = await this.userService.findByMobile(mobile);
    if (!user) {
      const message = this.i18n.t('errors.invalid_credentials');
      throw new BadRequestException(message);
    }
    const isMatch: boolean = this.bcryptService.compare(
      password,
      user.password,
    );
    if (!isMatch) {
      const message = this.i18n.t('errors..invalid_credentials');
      throw new BadRequestException(message);
    }
    return user;
  }
}
