// DEPENDENCIES
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

// DAO
import UserDao from './dao';

// SERVICES
import UserService from './service';

// UTILS
import Password from "../../utils/password";
import Jwt from "../../utils/jwt";
import { createResponse } from "../../utils/handler-response";
import { withMiddlewares } from "../../middlewares";
import { AppAdminMiddleware, SessionMiddleware } from "../../middlewares/session";

class Handler {
    constructor(private readonly userService: UserService, private readonly jwt: Jwt) {
    }

    public async createUser(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        const body = JSON.parse(event.body);

        try {
            return await this.userService.createUser(body);
        } catch (error) {
            return createResponse(500, false, error, "Something went wrong");
        }
    }
}

const dao = new UserDao();
const password = new Password();
const jwt = new Jwt();
const service = new UserService(dao, password);

export const handler = new Handler(service, jwt);
export const createUser = withMiddlewares(handler.createUser.bind(handler), [SessionMiddleware(), AppAdminMiddleware()]);
