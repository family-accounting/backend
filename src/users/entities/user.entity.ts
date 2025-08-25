// user.entity.ts
// import { UserRoleEnum } from "src/common/enums";
import { AccountEntity } from "src/accounts/entities/account.entity";
import { RoleEntity } from "src/roles/entities/role.entity";
import { LoanEntity } from "src/loans/entities/loan.entity";
import { TagEntity } from "src/tags/entities/tag.entity";
import { TransactionEntity } from "src/transactions/entities/transaction.entity";
import { Column, CreateDateColumn, DeleteDateColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, Index, Entity, ManyToMany } from "typeorm";
import { BaseEntity } from "typeorm";

@Entity('users')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    username: string;

    @Column({ type: 'varchar', length: 20, nullable: false, unique: true })
    @Index()
    mobile: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    firstName?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    lastName?: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    password: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt?: Date;

    // relations
    @OneToMany(() => TransactionEntity, transaction => transaction.user)
    transactions: TransactionEntity[];

    @OneToMany(() => AccountEntity, account => account.user, { cascade: true })
    accounts: AccountEntity[];

    @OneToMany(() => LoanEntity, loan => loan.user, { cascade: true })
    loans: LoanEntity[];

    @OneToMany(() => TagEntity, tag => tag.user, { cascade: true })
    tags: TagEntity[];


    @ManyToMany(() => RoleEntity, role => role.users)
    roles: RoleEntity[];
}
