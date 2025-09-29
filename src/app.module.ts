import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './common/config/config.module';
import { TransactionsModule } from './transactions/transactions.module';
import { GroupsModule } from './groups/groups.module';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    AuthModule,
    TransactionsModule,
    GroupsModule,
    ProfilesModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
