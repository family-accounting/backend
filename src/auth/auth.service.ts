import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { LoginAuthDto, RegisterAuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { I18nContext, I18nService } from 'nestjs-i18n';


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly i18n: I18nService
  ) { }

  async login(dto: LoginAuthDto) {

    const user = await this.usersService.findByMobile(dto.mobile);
    if (!user) {
      const message = await this.i18n.t('auth.login.error');
      throw new UnauthorizedException(message);
    }
    const payload = { mobile: dto.mobile, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(dto: RegisterAuthDto) {
    return this.usersService.create(dto);
  }

  async validate(mobile: string, password: string) {
    const user = await this.usersService.findByMobile(mobile);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
}
