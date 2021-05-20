import { Request, Response } from 'express';

/**
 * @property { Function } getProfile Get session data
 * @param { Request } - Express Request Object
 * @param { Response } - Express Response Object
 * @returns { Promise<Response> } - Throws error if not logged in
 */
export const getProfile = async (req: Request, res: Response): Promise<Response> => {
    try {
        return res.status(200).json(req.session.user);
    } catch (error) {
        throw new Error('Get profile error: ' + error);
    }
}
