// DEPENDENCIES
import { Connection, ConnectionManager, createConnection, getConnectionManager } from 'typeorm';

// CONFIG
import ormConfig from "./config-env";

/**
* Database manager class
*/
export class Database {
    private connectionManager: ConnectionManager;

    constructor() {
        this.connectionManager = getConnectionManager();
    }

    public async getConnection(): Promise<Connection> {
        let connection: Connection;

        if (this.connectionManager?.has(process.env.TYPEORM_CONNECTION_NAME)) {
            connection = await this.connectionManager.get(process.env.TYPEORM_CONNECTION_NAME)

            if (!connection.isConnected) connection = await connection.connect();
        }
        else {

            const connectionConfig = {...ormConfig[1]};

            if (process.env.POSTGRES_HOST.includes('dev')) {
                connectionConfig['ssl'] = {
                    rejectUnauthorized: false
                }
            }

            connection = await createConnection(connectionConfig);
        }

        return connection;
    }
}
