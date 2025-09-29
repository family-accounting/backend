import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '@/users/users.module';
import { ServicesModule } from '@/common/services/services.module';

@Module({
  imports: [UsersModule, ServicesModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
