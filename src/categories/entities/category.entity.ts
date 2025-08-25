// category.entity.ts
import { TransactionTypeEnum } from "src/common/enums";
import { TransactionEntity } from "src/transactions/entities/transaction.entity";
import { Column, CreateDateColumn, DeleteDateColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, Index, Entity, BaseEntity } from "typeorm";

@Entity('categories')
export class CategoryEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    label: string;

    @Index()
    @Column({ type: 'varchar', length: 255, unique: true })
    value: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    description?: string;

    @Column({ type: 'enum', enum: TransactionTypeEnum })
    type: TransactionTypeEnum;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt?: Date;

    // relations
    @OneToMany(() => TransactionEntity, transaction => transaction.category, { cascade: true })
    transactions: TransactionEntity[];
}
