import argon2 from 'argon2';
import UsersModels from '../models/users.model';
import { UserCredentials, UserSession, UserPassword, AuthResponse } from '../../typings/login';

// Output messages
const successMessage: string = 'Authenticate success';
const authErrorMessage: string = 'Authenticate error: ';
const matchErrorMessage: string = 'Username or password no match';
const getUserSessionErrorMessage: string = 'Get session data error';

/**
 * @property { Function } auth User authentification service
 * @param { UserCredentials } - User credentials object
 * @returns { Promise<AuthResponse> } - User session data and status message
 * @throws { Error }
 */
const auth = async (userCredentials: UserCredentials): Promise<AuthResponse> => {
    try {
        const usersModels: UsersModels = new UsersModels();
        const userPassword: UserPassword = await usersModels.getPasswordByUsername(userCredentials.username);
        if (userPassword) {
            const isPasswordMatch: boolean = await argon2.verify(userPassword.hashedPassword, userCredentials.password);
            if (!isPasswordMatch) {
                return { message: matchErrorMessage };
            }
        } else {
            return { message: matchErrorMessage };
        }
        const userSession: UserSession = await usersModels.getUserSessionByUsername(userCredentials.username);
        if (!userSession) {
            throw new Error(getUserSessionErrorMessage);
        }
        return { userSession: userSession, message: successMessage };
    } catch (error) {
        throw new Error(authErrorMessage + error);
    }
}

export default auth;