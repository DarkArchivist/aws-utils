// DEPENDENCIES
import { Connection } from "typeorm";

// DATABASE
import { Database } from '../database/config';

// MAIN CLASS
export default class BaseDao {
    protected db: Database;

    constructor() {
        this.db = new Database();
    };

    protected async createConnection(): Promise<Connection> {
        return await this.db.getConnection();
    }
}