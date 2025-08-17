import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../users/entities/user.entity';
import {
  Account,
  AccountType,
  Currency,
} from '../accounts/entities/account.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
  ) {}

  async seed() {
    console.log('🌱 Starting database seeding...');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = this.usersRepository.create({
      email: 'admin@family.com',
      password: adminPassword,
      name: 'Family Admin',
      role: UserRole.ADMIN,
      isActive: true,
    });
    const savedAdmin = await this.usersRepository.save(admin);
    console.log('✅ Admin user created');

    // Create member users
    const member1Password = await bcrypt.hash('member123', 10);
    const member1 = this.usersRepository.create({
      email: 'member1@family.com',
      password: member1Password,
      name: 'John Doe',
      role: UserRole.MEMBER,
      isActive: true,
    });
    const savedMember1 = await this.usersRepository.save(member1);
    console.log('✅ Member 1 created');

    const member2Password = await bcrypt.hash('member123', 10);
    const member2 = this.usersRepository.create({
      email: 'member2@family.com',
      password: member2Password,
      name: 'Jane Doe',
      role: UserRole.MEMBER,
      isActive: true,
    });
    const savedMember2 = await this.usersRepository.save(member2);
    console.log('✅ Member 2 created');

    // Create viewer user
    const viewerPassword = await bcrypt.hash('viewer123', 10);
    const viewer = this.usersRepository.create({
      email: 'viewer@family.com',
      password: viewerPassword,
      name: 'Family Viewer',
      role: UserRole.VIEWER,
      isActive: true,
    });
    const savedViewer = await this.usersRepository.save(viewer);
    console.log('✅ Viewer user created');

    // Create accounts for admin
    const adminCashAccount = this.accountsRepository.create({
      name: 'Admin Cash',
      type: AccountType.CASH,
      currency: Currency.USD,
      balance: 1000,
      description: 'Admin cash account',
      userId: savedAdmin.id,
      isActive: true,
    });
    await this.accountsRepository.save(adminCashAccount);

    const adminBankAccount = this.accountsRepository.create({
      name: 'Admin Bank Account',
      type: AccountType.BANK,
      currency: Currency.USD,
      balance: 5000,
      description: 'Admin bank account',
      userId: savedAdmin.id,
      isActive: true,
    });
    await this.accountsRepository.save(adminBankAccount);
    console.log('✅ Admin accounts created');

    // Create accounts for member 1
    const member1CashAccount = this.accountsRepository.create({
      name: 'John Cash',
      type: AccountType.CASH,
      currency: Currency.USD,
      balance: 500,
      description: 'John cash account',
      userId: savedMember1.id,
      isActive: true,
    });
    await this.accountsRepository.save(member1CashAccount);

    const member1BankAccount = this.accountsRepository.create({
      name: 'John Bank Account',
      type: AccountType.BANK,
      currency: Currency.USD,
      balance: 2000,
      description: 'John bank account',
      userId: savedMember1.id,
      isActive: true,
    });
    await this.accountsRepository.save(member1BankAccount);
    console.log('✅ Member 1 accounts created');

    // Create accounts for member 2
    const member2CashAccount = this.accountsRepository.create({
      name: 'Jane Cash',
      type: AccountType.CASH,
      currency: Currency.USD,
      balance: 300,
      description: 'Jane cash account',
      userId: savedMember2.id,
      isActive: true,
    });
    await this.accountsRepository.save(member2CashAccount);

    const member2BankAccount = this.accountsRepository.create({
      name: 'Jane Bank Account',
      type: AccountType.BANK,
      currency: Currency.USD,
      balance: 1500,
      description: 'Jane bank account',
      userId: savedMember2.id,
      isActive: true,
    });
    await this.accountsRepository.save(member2BankAccount);
    console.log('✅ Member 2 accounts created');

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📋 Default Users:');
    console.log('Admin: admin@family.com / admin123');
    console.log('Member 1: member1@family.com / member123');
    console.log('Member 2: member2@family.com / member123');
    console.log('Viewer: viewer@family.com / viewer123');
  }
}
