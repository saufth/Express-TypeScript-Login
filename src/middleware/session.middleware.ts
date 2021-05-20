import { RequestHandler } from 'express';
import session, { SessionOptions } from 'express-session';
import { createRedisStore } from '../database/redis';
import { isProductionEnv, sessionSecret } from '../config/secrets';

const sessionOptions: SessionOptions = {
    name: 'sessionCookie',
    store: createRedisStore(session),
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: isProductionEnv(),
        httpOnly: true,
        maxAge: 1000 * 60 * 60 // 1 hour
    }
};

export type SessionFunction = (options?: SessionOptions | undefined) => RequestHandler;

export default session(sessionOptions);
