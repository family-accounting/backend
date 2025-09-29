import { UserEntity } from "@/users/entities/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import type { CreatedAt, Email, Id, Mobile, UpdatedAt } from "@/common/types";

@Entity({ name: 'profiles' })
export class ProfileEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: Id;

    @Column({ type: 'varchar', length: 60, nullable: false })
    firstName: string;

    @Column({ type: 'varchar', length: 60, nullable: false })
    lastName: string;

    @Column({ type: 'varchar', length: 60, nullable: false })
    email: Email;

    @Column({ type: 'varchar', length: 60, nullable: false })
    mobile: Mobile;

    @CreateDateColumn({ type: 'timestamp', nullable: false })
    createdAt: CreatedAt;
  
    @UpdateDateColumn({ type: 'timestamp', nullable: false })
    updatedAt: UpdatedAt;   

    // relation width user
    @OneToOne(() => UserEntity, (user) => user.profile)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;
}
