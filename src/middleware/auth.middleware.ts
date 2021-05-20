import { Request, Response, NextFunction } from 'express';

/**
 * @property { Function } isLoggedIn Check if a session exist
 * @param { Request } - Express Request Object
 * @returns { Promise<void> } - Throws error if not logged in
 */
const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.session || !req.session.user) {
            res.status(401);
            next(new Error('Athentication error'));
        }
        next();
    } catch (error) {
        throw new Error('Athentication error: ' + error);
    }
}

export default authenticate;
