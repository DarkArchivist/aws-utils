// DEPENDENCIES
import { Connection } from "typeorm";

// DATABASE
import { Database } from "../database/config";
import UserEntity from "../database/entities/user.entity";

// UTILS
import { createResponse } from "../utils/handler-response";
import Jwt from "../utils/jwt";


const SessionMiddleware = () => {
    const jwt = new Jwt();

    return async (event, context, next) => {
        const db = new Database();
        const dbConn: Connection = await db.getConnection();
        const token = event.headers.Authorization;

        if (!token) {
            throw createResponse(403, false, {}, "You have to be authenticated, in order to access this resource")
        }

        return await jwt
            .checkToken(
                token.split(' ')[1],
                async (err, decoded) => {
                    if (err) {
                        return Promise.reject(
                            createResponse(
                            401,
                            false,
                            {},
                            "Your session has expired")
                        );
                    }

                    const user = await dbConn
                        .getRepository(UserEntity)
                        .findOne({
                            where: { user_account_id: decoded.id },
                            relations: [
                                'role',
                                'dealerships',
                                'dealerships.state'
                            ]
                        });

                    const eventData = {
                        ...event,
                        user,
                        dealership_store_id: decoded.dealership_store_id
                    }

                    return next(eventData, context)
                        .then(result => result)
                        .catch(error => Promise.reject(error));
                })
    }
};

const AppAdminMiddleware = () => {
    return async (event, context, next) => {
        if (event.user.role.char_key !== 'APPADM') {
            throw createResponse(403, false, {}, "You lack privileges to access this resource")
        }

        return next(event, context)
            .then(result => result)
            .catch(error => Promise.reject(error));
    }
}

export { SessionMiddleware, AppAdminMiddleware };