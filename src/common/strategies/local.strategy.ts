import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'mobile' });
  }

  async validate(mobile: string, password: string): Promise<any> {
    const user = await this.authService.validate(mobile, password);
    if (!user) {
      throw new BadRequestException('User or password is incorrect');
    }
    return user;
  }
}
