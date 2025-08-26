import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { LoginAuthDto, RegisterAuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { pick } from 'lodash';
import { UserDto } from 'src/users/dto/user.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly i18n: I18nService,
    private readonly configService: ConfigService,
  ) { }

  async login(dto: LoginAuthDto) {

    const user = await this.usersService.findByMobile(dto.mobile);
    if (!user) {
      const message = await this.i18n.t('auth.login.error');
      throw new UnauthorizedException(message);
    }
    const payload = { mobile: dto.mobile, sub: user.id };
    const access_token = this.jwtService.sign(payload);
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });
    return {
      access_token,
      user: pick(user, ['id', 'username', 'mobile', 'firstName', 'lastName', 'createdAt', 'updatedAt', 'permissions']),
      refresh_token,
    };
  }

  async register(dto: RegisterAuthDto) {
    const user = await this.usersService.findByMobile(dto.mobile);
    if (user) {
      const message = await this.i18n.t('auth.register.error');
      throw new UnauthorizedException(message);
    }
    const saltRounds = this.configService.get<number>('BCRYPT_SALT_ROUNDS')!;
    const hashedPassword = await bcrypt.hash(dto.password, saltRounds);
    return await this.usersService.create({ ...dto, password: hashedPassword });
  }

  async validate(mobile: string, password: string) {
    const user = await this.usersService.findByMobile(mobile);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }
}
