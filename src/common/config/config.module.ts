import { Module } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getOrmConfig } from './orm.config';
import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import path from 'path';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [NestConfigModule],
      useFactory: (configService: ConfigService) => getOrmConfig(configService),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [NestConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.getOrThrow<number>('EXPIRES_IN'),
        },
      }),
      inject: [ConfigService],
      global: true,
    }),
    I18nModule.forRootAsync({
      imports: [NestConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.getOrThrow<string>('FALLBACK_LANGUAGE'),
        loaderOptions: {
          path: path.join(process.cwd(), 'src', 'common', 'i18n'),
          watch: true,
        },
        resolvers: [
          new QueryResolver(['lang']),
          new HeaderResolver(['x-custom-lang']),
          new AcceptLanguageResolver(),
          new CookieResolver(),
        ],
      }),
    }),
  ],
})
export class ConfigModule {}
