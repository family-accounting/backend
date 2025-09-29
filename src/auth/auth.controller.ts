import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { RegisterAuthDto, LoginAuthDto } from './dto/auth.dto';
import { loginAuthSchema, registerAuthSchema } from './dto/auth.dto';
import { ZodValidationPipe } from '@/common/pipes/zod-validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body(new ZodValidationPipe(registerAuthSchema)) dto: RegisterAuthDto,
  ) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body(new ZodValidationPipe(loginAuthSchema)) dto: LoginAuthDto) {
    return this.authService.login(dto);
  }
}
