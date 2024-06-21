import mysql, {Pool, PoolOptions} from "mysql2/promise";
import {DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER} from "./variables";

const settings: PoolOptions = {
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    port: parseInt(DB_PORT),
};

const database: Pool = <Pool>mysql.createPool(settings);

export default database;