import cors, { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
    optionsSuccessStatus: 200,
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Headers'
    ],
    credentials: true,
    methods: 'GET,PUT,POST,DELETE',
    origin: ['http//:localhost:3001/'],
    preflightContinue: false,
};

export default cors(corsOptions);
