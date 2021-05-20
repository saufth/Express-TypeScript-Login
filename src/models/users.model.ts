import connect, { mysqlResultToJSON } from '../database/mysql';
import { UserSession, UserPassword } from '../../typings/login';
import { MySQLConnection, MySQLResult } from '../../typings/mysql';
import { StringNumberArray } from '../../typings/arrays';
/**
 * Autenticate a user credentials to access to application
 */
class UsersModels {

    private readonly activeStatus: number = 1;

    private readonly getSessionByUsernameQuery: string = 'SELECT '+
                                                    'BIN_TO_UUID(`users`.`row_key`, TRUE) AS `user_key`, ' +
                                                    'BIN_TO_UUID(`profiles`.`row_key`, TRUE) AS `profile_key` ' +
                                                'FROM ' +
                                                    '`users` ' +
                                                'LEFT JOIN ' +
                                                    '`profiles` ' +
                                                'ON ' +
                                                    '`users`.`profile_key` = `profiles`.`row_key` ' +
                                                'WHERE ' +
                                                    'BINARY `users`.`username` = ? AND `users`.`status` = ?';

    private readonly getPasswordByUsernameQuery: string = 'SELECT '+
                                                        '`users`.`password` AS `hashedPassword` ' +
                                                    'FROM ' +
                                                        '`users` ' +
                                                    'WHERE ' +
                                                        'BINARY `users`.`username` = ? AND `users`.`status` = ?';

    constructor() {}

    /**
     * @property { Function } getSessionByUsername Request user keys for authentication and authorization
     * @param { username } - Username
     * @returns { Promise<UserLoggedIn> } - User name and access data
     */
    public getUserSessionByUsername = async (username: string): Promise<UserSession> => {
        try {
            const connection: MySQLConnection = await connect();
            const queryParams: StringNumberArray = [username, this.activeStatus];
            const userSession: MySQLResult = await connection.query(this.getSessionByUsernameQuery, queryParams);
            await connection.end();
            return mysqlResultToJSON<UserSession>(userSession);
        } catch (error) {
            throw new Error('Get user session error: ' + error);
        }
    }

    /**
     * @property { Function } getPasswordByUsername Request user logged in data
     * @param { username } - Username
     * @returns { Promise<UserLoggedIn> } - User name and access data
     */
    public getPasswordByUsername = async (username: string): Promise<UserPassword> => {
        try {
            const connection: MySQLConnection = await connect();
            const queryParams: StringNumberArray = [username, this.activeStatus];
            const hashedPassword: MySQLResult = await connection.query(this.getPasswordByUsernameQuery, queryParams);
            await connection.end();
            return mysqlResultToJSON<UserPassword>(hashedPassword);
        } catch (error) {
            throw new Error('Get password error: ' + error);
        }
    }

}

export default UsersModels;
