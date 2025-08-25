import { AccountEntity } from "src/accounts/entities/account.entity";
import { LoanStatusEnum } from "src/common/enums";
import { TransactionEntity } from "src/transactions/entities/transaction.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, Entity, BaseEntity } from "typeorm";

@Entity('loans')
export class LoanEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    amount: number; // مبلغ کل وام

    @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
    paidAmount: number; // مقدار پرداخت شده تاکنون

    @Column({ type: 'timestamp' })
    startDate: Date; // تاریخ شروع وام

    @Column({ type: 'timestamp', nullable: true })
    endDate?: Date; // تاریخ پایان یا بازپرداخت کامل

    @Column({ type: 'enum', enum: LoanStatusEnum, default: LoanStatusEnum.PENDING })
    status: LoanStatusEnum;

    @Column({ type: 'varchar', length: 255, nullable: true })
    description?: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt?: Date;

    // relations
    @ManyToOne(() => UserEntity, user => user.loans, { onDelete: 'CASCADE' })
    @Column({ type: 'uuid' })
    userId: string;
    user: UserEntity;

    @ManyToOne(() => AccountEntity, account => account.loans, { onDelete: 'CASCADE' })
    @Column({ type: 'uuid' })
    accountId: string;
    account: AccountEntity;

    @OneToMany(() => TransactionEntity, transaction => transaction.loan, { cascade: true })
    transactions: TransactionEntity[];
}
