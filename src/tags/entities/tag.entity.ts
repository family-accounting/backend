// tag.entity.ts
import { TransactionEntity } from "src/transactions/entities/transaction.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn, Index, Entity, ManyToOne, BaseEntity } from "typeorm";

@Entity('tags')
export class TagEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    label: string;

    @Index()
    @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
    value: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    description?: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt?: Date;

    // relations
    @ManyToMany(() => TransactionEntity, transaction => transaction.tags)
    transactions: TransactionEntity[];

    @ManyToOne(() => UserEntity, user => user.tags)
    user: UserEntity;
}
