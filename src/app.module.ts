import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { TransactionsModule } from './transactions/transactions.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule as AppConfigModule } from './common/config/config.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getOrmConfig } from './common/config/orm.config';
import { TagsModule } from './tags/tags.module';
import { AccountsModule } from './accounts/accounts.module';
import { LoansModule } from './loans/loans.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { I18nModule, AcceptLanguageResolver, QueryResolver, HeaderResolver, CookieResolver } from 'nestjs-i18n';
import { ReportsModule } from './reports/reports.module';
import { BudgetsModule } from './budgets/budgets.module';
import { NotificationsModule } from './notifications/notifications.module';
import { DebtsModule } from './debts/debts.module';
import { SharedExpensesModule } from './shared-expenses/shared-expenses.module';
import { RecurringTransactionsModule } from './recurring-transactions/recurring-transactions.module';
import { GoalsModule } from './goals/goals.module';
import { InvestmentsModule } from './investments/investments.module';
import * as path from 'path';
@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => getOrmConfig(configService),
      inject: [ConfigService],
    }),

    I18nModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.getOrThrow('FALLBACK_LANGUAGE'),
        loaderOptions: {
          path: path.join(process.cwd(), 'src', 'common', 'i18n'),
          watch: true,
        },
        resolvers: [
          { use: QueryResolver, options: ['lang', 'l'] },
          { use: HeaderResolver, options: ['x-custom-lang'] },
          CookieResolver,
          AcceptLanguageResolver,
        ],
      }),
    }),
    

    CategoriesModule, TransactionsModule, UsersModule, AuthModule, TagsModule, AccountsModule, LoansModule, RolesModule, PermissionsModule, ReportsModule, BudgetsModule, NotificationsModule, DebtsModule, SharedExpensesModule, RecurringTransactionsModule, GoalsModule, InvestmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
