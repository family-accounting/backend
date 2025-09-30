import { Column, CreateDateColumn, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import type {Id, CreatedAt ,UpdatedAt} from "@/common/types";
import { Entity, BaseEntity } from "typeorm";
import { RoleEntity } from "@/roles/entities/role.entity";

@Entity({ name: 'permissions' })
export class PermissionEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: Id;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @CreateDateColumn({ type: 'timestamp', nullable: false })
    createdAt: CreatedAt;   

    @UpdateDateColumn({ type: 'timestamp', nullable: false })
    updatedAt: UpdatedAt;

    // relation with role
    @ManyToMany(() => RoleEntity, (role) => role.permissions)
    roles: RoleEntity[];
}
