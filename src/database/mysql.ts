import { createPool } from 'mysql2/promise';
import { mysqlPoolOptions } from '../config/secrets';
import { MySQLConnection, MySQLResult } from '../../typings/mysql';

/**
 * @property { Function } mysqlResultToJSON Converts a Javascript object of MySLQ query result to JSON
 * @param { MySQLResult } - Javascript object of MySLQ query result
 * @returns { T } - Generic JSON type
 */
 export const mysqlResultToJSON = <T>(object: MySQLResult): T => {
    return JSON.parse(JSON.stringify(object[0]))[0];
}

/**
 * @property { Function } connect Create a Pool for MySQL connection
 * @return { Promise<MySQLConnection> } - MySQL connection
 */
const connect = async (): Promise<MySQLConnection> => {
    const connection: MySQLConnection = await createPool(mysqlPoolOptions);
    return connection;
}

export default connect;
