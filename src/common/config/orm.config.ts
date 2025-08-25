import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from 'src/users/entities/user.entity';
import { TransactionEntity } from 'src/transactions/entities/transaction.entity';
import { TagEntity } from 'src/tags/entities/tag.entity';
import { PermissionEntity } from 'src/permissions/entities/permission.entity';
import { RoleEntity } from 'src/roles/entities/role.entity';
import { LoanEntity } from 'src/loans/entities/loan.entity';
import { AccountEntity } from 'src/accounts/entities/account.entity';
import { CategoryEntity } from 'src/categories/entities/category.entity';

export const getOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASS'),
  database: configService.get<string>('DB_NAME'),
  entities: [UserEntity, TransactionEntity, TagEntity, PermissionEntity, RoleEntity, LoanEntity,AccountEntity,CategoryEntity],
  synchronize: configService.get<boolean>('DB_SYNC'),
  logging: configService.get<boolean>('DB_LOGGING'),
});
