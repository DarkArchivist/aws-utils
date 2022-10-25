import { ConnectionOptions } from "typeorm";
import UserEntity from "./entities/user.entity";
import UserRoleEntity from "./entities/user-role.entity";


const defaultConfig:ConnectionOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'password',
    database: process.env.POSTGRES_DATABASE || 'name',
    logging: ['warn', 'error'],
    logger: !!process.env.IS_DEV ? 'debug' : 'file',
    entities: [
        UserEntity,
        UserRoleEntity,
    ],
    migrationsTableName: 'migrations_name',
    migrations: [
        process.env.MIGRATIONS_DIR
            ? `${__dirname}/migrations/${process.env.MIGRATIONS_DIR}/*.ts`
            : `${__dirname}/migrations/*.ts`,
    ],
    synchronize: !!process.env.IS_DEV,
    migrationsRun: false,
}

const ormConfig = [
    {
        name: 'default',
        ...defaultConfig,
        ssl: {
            rejectUnauthorized: false
        },
        cli: {
            migrationsDir: process.env.MIGRATIONS_DIR
                ? `${__dirname}/migrations/${process.env.MIGRATIONS_DIR}`
                : `${__dirname}/migrations`,
            entitiesDir: `${__dirname}/entities`
        }
    },
    {
        name: process.env.TYPEORM_CONNECTION_NAME,
        ...defaultConfig,
    }
]

export = ormConfig;