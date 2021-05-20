import express, { Application } from 'express';
import logger from './util/logger';

import IndexRoute from './routes/index.route';
import LoginRoute from './routes/login.route';
import ProfileRoute from './routes/profile.route';

import createSession from './middleware/session.middleware';
import cors from './middleware/cors.middleware';
import allowCrossDomain from './middleware/allowCrossDomain.middleware';

// Dev
import morgan from 'morgan';

export class App {

    private app: Application;

    /**
     * @param { port } - Server port
     */
    constructor(private port?: number | string) {
        this.app = express();
        this.init();
    }

    private settings = (): void => {
        this.app.set('port', this.port);
    }

    private middlewares = (): void => {
        this.app.use(allowCrossDomain);
        this.app.use(cors);
        this.app.use(express.json());
        this.app.use(morgan('dev'));
        this.app.use(createSession);
    }

    private routes = (): void => {
        this.app.use(IndexRoute);
        this.app.use('/login', LoginRoute);
        this.app.use('/profile', ProfileRoute);
    }

    public listen = async (): Promise<void> => {
        await this.app.listen(this.app.get('port'), (): void => {
            logger.info('Server listening on port: ' + this.app.get('port'));
        });
    }

    private init = (): void => {
        this.settings();
        this.middlewares();
        this.routes();
    }

}
