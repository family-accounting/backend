import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TransactionEntity } from 'src/transactions/entities/transaction.entity';
import { UserEntity } from 'src/users/entities/user.entity';

export const getOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASS'),
  database: configService.get<string>('DB_NAME'),
  entities: [UserEntity, TransactionEntity],
  synchronize: configService.get<boolean>('DB_SYNC'),
  logging: configService.get<boolean>('DB_LOGGING'),
});
