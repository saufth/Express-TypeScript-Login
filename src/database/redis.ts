import redis, { RedisClient } from 'redis';
import connectRedis, { RedisStore } from 'connect-redis';
import { SessionFunction } from '../middleware/session.middleware';
import { redisClientOpts} from '../config/secrets';

export const createRedisStore = (session: SessionFunction): RedisStore => {
    try {
        const RedisStore: RedisStore = connectRedis(session);
        const redisClient: RedisClient = redis.createClient(redisClientOpts);
        return new RedisStore({ client: redisClient });
    } catch (error) {
        throw new Error('Redis error: ' + error);
    }
}
