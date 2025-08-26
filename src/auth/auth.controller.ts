import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginAuthSchema, registerAuthSchema, type LoginAuthDto, type RegisterAuthDto } from './dto/auth.dto';
import { ZodValidationPipe } from 'src/common/pipe/zod-validation.pipe';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    
  ) { }

  @Post('login')
  login(@Body(new ZodValidationPipe(loginAuthSchema)) dto: LoginAuthDto) {
    return this.authService.login(dto);
  }


  @Post('register')
  async register(@Body(new ZodValidationPipe(registerAuthSchema)) dto: RegisterAuthDto) {
    return this.authService.register(dto);
  }


}
