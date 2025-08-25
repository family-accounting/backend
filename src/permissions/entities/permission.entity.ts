import { RoleEntity } from "src/roles/entities/role.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('permissions')
export class PermissionEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    label: string;

    @Column({ unique: true, nullable: false })
    value: string;

    @Column({ nullable: true })
    description?: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // relations
    @ManyToMany(() => RoleEntity, role => role.permissions)
    roles: RoleEntity[];
}
