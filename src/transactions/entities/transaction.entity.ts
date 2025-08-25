// transaction.entity.ts
import { AccountEntity } from "src/accounts/entities/account.entity";
import { CategoryEntity } from "src/categories/entities/category.entity";
import { CurrencyEnum, TransactionStatusEnum, TransactionTypeEnum } from "src/common/enums";
import { LoanEntity } from "src/loans/entities/loan.entity";
import { TagEntity } from "src/tags/entities/tag.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, Entity, JoinTable, BaseEntity } from "typeorm";

@Entity('transactions')
export class TransactionEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    title: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    amount: number;

    @Column({ type: 'enum', enum: CurrencyEnum })
    currency: CurrencyEnum;

    @Column({ type: 'enum', enum: TransactionTypeEnum })
    type: TransactionTypeEnum;

    @Column({ type: 'enum', enum: TransactionStatusEnum, default: TransactionStatusEnum.CONFIRMED })
    status: TransactionStatusEnum;

    @Column({ type: 'varchar', length: 255, nullable: true })
    reference?: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    transactionDate: Date;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt?: Date;

    // relations
    @ManyToOne(() => CategoryEntity, category => category.transactions, { onDelete: 'SET NULL' })
    @Column({ type: 'uuid', nullable: true })
    categoryId: string;
    category: CategoryEntity;

    @ManyToMany(() => TagEntity, tag => tag.transactions, { cascade: true })
    @JoinTable({
        name: 'transaction_tags',
        joinColumn: {
            name: 'transaction_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'tag_id',
            referencedColumnName: 'id',
        },
    })
    tags: TagEntity[];

    @ManyToOne(() => UserEntity, user => user.transactions, { onDelete: 'CASCADE' })
    @Column({ type: 'uuid' })
    userId: string;
    user: UserEntity;

    @ManyToOne(() => LoanEntity, loan => loan.transactions, { onDelete: 'SET NULL' })
    @Column({ type: 'uuid', nullable: true })
    loanId: string;
    loan: LoanEntity;

    @ManyToOne(() => AccountEntity, { onDelete: 'SET NULL', nullable: true })
    @Column({ type: 'uuid', nullable: true })
    fromAccountId?: string;
    fromAccount?: AccountEntity;

    @ManyToOne(() => AccountEntity, { onDelete: 'SET NULL', nullable: true })  
    @Column({ type: 'uuid', nullable: true })
    toAccountId?: string;
    toAccount?: AccountEntity;

    // برای انتقال بین اعضا
    @ManyToOne(() => UserEntity, { onDelete: 'SET NULL', nullable: true })
    @Column({ type: 'uuid', nullable: true })
    fromUserId?: string;
    fromUser?: UserEntity;

    @ManyToOne(() => UserEntity, { onDelete: 'SET NULL', nullable: true })
    @Column({ type: 'uuid', nullable: true })
    toUserId?: string;  
    toUser?: UserEntity;
}
