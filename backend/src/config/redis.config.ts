import Redis, { RedisOptions } from 'ioredis';

export const redisConfig: RedisOptions = {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
};

export const redisProvider = {
    provide: 'REDIS_CLIENT',
    useFactory: () => {
        return new Redis(redisConfig);
    },
};