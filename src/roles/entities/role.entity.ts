import { PermissionEntity } from "src/permissions/entities/permission.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn, JoinTable, BaseEntity } from "typeorm";

@Entity('roles')
export class RoleEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    label: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    value: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    description?: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;


    // relations
    @ManyToMany(() => PermissionEntity, permission => permission.roles)
    @JoinTable({
        name: 'role_permissions',
        joinColumn: {
            name: 'role_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'permission_id',
            referencedColumnName: 'id',
        },
    })
    permissions: PermissionEntity[];


    @ManyToMany(() => UserEntity, user => user.roles)
    @JoinTable({
        name: 'user_roles',
        joinColumn: {
            name: 'role_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
    })
    users: UserEntity[];

}
