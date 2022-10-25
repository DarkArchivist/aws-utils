// DEPENDENCIES
import { Connection } from 'typeorm';

// COMMON
import BaseDao from "../../common/base.dao";
import UserRoleEntity from "../../database/entities/user-role.entity";
import UserEntity from "../../database/entities/user.entity";

// ENTITIES

export default class UserDao extends BaseDao {

	async getRoleById(id: number): Promise<UserRoleEntity> {
		const dbConn: Connection = await this.createConnection();

		return await dbConn.getRepository(UserRoleEntity).findOneOrFail({
			where: {
				user_account_role_id: id
			}
		});
	}

	async saveUserEntity(user: UserEntity) {
		const dbConn: Connection = await this.createConnection();

		return await dbConn.getRepository(UserEntity).save(user);
	}
}
