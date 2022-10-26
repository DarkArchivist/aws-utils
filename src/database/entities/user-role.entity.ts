// DEPENDENCIES
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// MAIN ENTITY
@Entity({ name: 'user_account_role' })
export default class UserRoleEntity {
	@PrimaryGeneratedColumn('identity', { type: 'int4', generatedIdentity: 'ALWAYS' })
	user_account_role_id!: number;

	@Column({ type: 'varchar', length: 6 }) char_key: string;
	@Column({ type: 'varchar', length: 100 }) role: string;

	@CreateDateColumn({ select: false }) created_date: Date;
	@UpdateDateColumn({ select: false }) updated_date: Date;
}
