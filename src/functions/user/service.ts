// ENTITIES
import UserEntity from "../../database/entities/user.entity";

// DAO
import UserDao from './dao';

import Password from "../../utils/password";
import { createResponse } from "../../utils/handler-response";

export default class UserService {
    constructor(
        private readonly userDao: UserDao,
        private readonly password: Password,
    ) {
    }

    async createUser(body) {
        const {user_account_role_id, dealership_store_id: dxIds, password: pwd, ...userData} = body;

        const user = new UserEntity();

        const salt = await this.password.generateSalt();
        const role = await this.userDao.getRoleById(user_account_role_id)

        Object.keys(userData).forEach(key => user[key] = userData[key]);

        user.password = await this.password.generateHash(pwd, salt);
        user.password_salt = salt;
        user.role = role;

        const res = await this.userDao.saveUserEntity(user);

        return createResponse(
            200,
            true,
            {
                result: {
                    user_account_id: res.user_account_id
                }
            },
            "User updated successfully"
        )
    }

}
