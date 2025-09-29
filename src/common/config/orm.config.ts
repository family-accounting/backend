import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TransactionEntity } from '@/transactions/entities/transaction.entity';
import { UserEntity } from '@/users/entities/user.entity';
import { ProfileEntity } from '@/profiles/entities/profile.entity';
import { GroupEntity } from '@/groups/entities/group.entity';
import { WalletEntity } from '@/wallets/entities/wallet.entity';
import { CategoryEntity } from '@/categories/entities/category.entity';
import { TagEntity } from '@/tags/entities/tag.entity';

export const getOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASS'),
  database: configService.get<string>('DB_NAME'),
  entities: [
    UserEntity,
    TransactionEntity,
    ProfileEntity,
    GroupEntity,
    WalletEntity,
    CategoryEntity,
    TagEntity
  ],
  synchronize: configService.get<boolean>('DB_SYNC'),
  logging: configService.get<boolean>('DB_LOGGING'),
});
