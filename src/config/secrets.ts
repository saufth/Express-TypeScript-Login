import { config as dotenv, DotenvConfigOutput } from 'dotenv';
import { PoolOptions } from 'mysql2/promise';
import { ClientOpts } from 'redis';

const dotenvConfigOutput: DotenvConfigOutput = dotenv();

if (dotenvConfigOutput.error) {
  throw new Error("Couldn't find .env file");
}

if (!process.env.SESSION_SECRET) {
    console.log('No client secret. Set SESSION_SECRET environment variable.');
    process.exit(1);
}

if (!process.env.MYSQL_HOST || !process.env.MYSQL_USER || !process.env.MYSQL_DB || !process.env.MYSQL_CONN_LIMIT) {
    console.log('No MySQL connection data. Set MySQL Pool Options environment variables.');
    process.exit(1);
}

export const sessionSecret: string = (process.env.SESSION_SECRET+'');

export const mysqlPoolOptions: PoolOptions = {
    host: (process.env.MYSQL_HOST+''),
    user: (process.env.MYSQL_USER+''),
    database: (process.env.MYSQL_DB+''),
    // password: (process.env.MYSQL_PASSWORD+''),
    connectionLimit: parseInt(process.env.MYSQL_CONN_LIMIT+'')
};

export const redisClientOpts: ClientOpts = {
    port: parseInt(process.env.REDIS_PORT+''),
    host: mysqlPoolOptions.host
};

export const serverPort: number = parseInt(process.env.PORT+'');

export const enviroment: string = process.env.NODE_ENV ? (process.env.NODE_ENV+'') : 'development';

/**
 * @property { Function } isProduction Verify if environment is on 'production' mode
 * @returns { boolean } - True if enviroment is on 'production' mode else false
 */
export const isProductionEnv = (): boolean => {
    return enviroment === 'production';
};
