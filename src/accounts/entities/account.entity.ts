// account.entity.ts
import { AccountTypeEnum, CurrencyEnum } from "src/common/enums";
import { LoanEntity } from "src/loans/entities/loan.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TransactionEntity } from "src/transactions/entities/transaction.entity";

@Entity('accounts')
export class AccountEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
    balance: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true, default: 0 })
    initialBalance?: number;

    @Column({ type: 'enum', enum: AccountTypeEnum })
    type: AccountTypeEnum;

    @Column({ type: 'enum', enum: CurrencyEnum })
    currency: CurrencyEnum;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt?: Date;

    // relations
    @ManyToOne(() => UserEntity, user => user.accounts, { onDelete: 'CASCADE' })
    @Column({ type: 'uuid' })
    userId: string;
    user: UserEntity;

    @OneToMany(() => LoanEntity, loan => loan.account, { cascade: true })
    loans: LoanEntity[];

    @OneToMany(() => TransactionEntity, transaction => transaction.fromAccount)
    outgoingTransactions: TransactionEntity[];

    @OneToMany(() => TransactionEntity, transaction => transaction.toAccount)
    incomingTransactions: TransactionEntity[];
}
