import { Request, Response } from 'express';
import { UserCredentials, AuthResponse } from '../../typings/login';
import auth from '../services/auth.service';

/**
 * Log in controller
 */
export default class LogIn {

    private static readonly userCredentialsErrorMessage: string = 'Get user\'s credentials error';
    private static readonly loginErrorMessage: string = 'Log in error';

    /**
     * @property { Function } signin User authentification service
     * @param { Request } - Express Request Object
     * @param { Response } - Express Response Object
     * @returns { Promise<Response> } - User name and access data
     */
    public login = async (req: Request, res: Response): Promise<Response> => {
        try {
            if (!req.body.username || !req.body.password) {
                return res.status(400).json({ status: false, message: LogIn.userCredentialsErrorMessage });
            }
            const userCredentials: UserCredentials = req.body;
            const authResponse: AuthResponse = await auth(userCredentials);
            if (!authResponse.userSession) {
                return res.status(401).json({ status: false, message: authResponse.message });
            }
            req.session.views = req.session.views ? (req.session.views+1) : 1;
            req.session.user = authResponse.userSession;
            return res.status(200).json({ status: true, message: authResponse.message });
        } catch (error) {
            res.status(500).json({ status: false, message: LogIn.loginErrorMessage });
            throw new Error(LogIn.loginErrorMessage + ': ' + error);
        }
    }

    /**
     * @property { Function } logOut Destroy session
     * @param { Request } - Express Request Object
     * @param { Response } - Express Response Object
     * @returns { Promise<Response> } - Throws error if not logged in
     */
    public logOut = async (req: Request, res: Response): Promise<Response> => {
        try {
            req.session.destroy((err: Error): void => {
                (err) ? console.log('Can\'t logged out') : console.log('Logged out');
            });
            return res.status(200).json('Logged out');
        } catch (error) {
            res.status(500).json('Can\'t logged out');
            throw new Error('Log in error: ' + error);
        }
    }

}
