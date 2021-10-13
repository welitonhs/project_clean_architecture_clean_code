import { IDatabaseConnection } from "./IDatabaseConnection";
import pgp from 'pg-promise';

class DatabaseConnectionAdapter implements IDatabaseConnection {
    pgp: any;

    constructor () {
        this.pgp = pgp()("postgres://postgres:root@localhost:5432/ccca")
    }

    query(statement: string, params: any) {
        return this.pgp.query(statement, params);
    }

}

export { DatabaseConnectionAdapter }