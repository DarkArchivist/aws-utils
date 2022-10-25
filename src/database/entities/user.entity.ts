// DEPENDENCIES
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

// ENTITIES
import UserRoleEntity from "./user-role.entity";

// MAIN ENTITY
@Entity({ name: 'mapa_user_account' })
export default class UserEntity {
    @PrimaryGeneratedColumn('identity', { type: 'int4', generatedIdentity: 'ALWAYS' })
    user_account_id!: number;

    @ManyToOne(() => UserRoleEntity)
    @JoinColumn({name: 'user_account_role_id', referencedColumnName: 'user_account_role_id'})
    role: UserRoleEntity;

    @Column({ type: 'varchar', length: 100, select: false }) password?: string;
    @Column({ type: 'varchar', length: 100, select: false }) password_salt?: string;
    @Column({ type: 'varchar', length: 100, select: false, default: 'bcrypt' }) password_hash_algorithm?: string;
    @Column({ type: 'bool', select:false, default: false }) password_change_required?: boolean;

    @Column({ type: 'varchar', length: 50 }) first_name: string;
    @Column({ type: 'varchar', length: 50 }) last_name: string;
    @Column({ type: 'varchar', default: '' }) main_phone: string;
    @Column({ type: 'varchar', default: '' }) cell_phone: string;
    @Column({ type: 'varchar', length: 100, default: '', unique: true }) email_address: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) last_login_date?: string;

    @Column({ type: 'bool', default: true }) active_flag?: boolean;

    @Column({ type: 'varchar', length: 20, unique: true }) username: string;

    @CreateDateColumn({ select: false }) created_date: Date;
    @UpdateDateColumn({ select: false }) updated_date: Date;
}
