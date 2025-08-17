import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from './accounts/accounts.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule as AppConfigModule } from './config/config.module';
import { getOrmConfig } from './config/orm.config';
import { LoansModule } from './loans/loans.module';
import { TransactionsModule } from './transactions/transactions.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => getOrmConfig(configService),
      inject: [ConfigService],
    }),
    AppConfigModule,
    AuthModule,
    UsersModule,
    AccountsModule,
    TransactionsModule,
    LoansModule,
  ],
  controllers: [],
  providers: [],
})
export class V1Module {}
