import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
    constructor(
        @Inject('REDIS_CLIENT') private readonly redisClient: Redis
    ) { }
    async set(key: string, value: any, expirationInSeconds: number): Promise<void> {
        await this.redisClient.set(key, JSON.stringify(value), 'EX', expirationInSeconds);
    }

    async get(key: string): Promise<string | null> {
        return await this.redisClient.get(key);
    }

    async delete(key: string): Promise<void> {
        await this.redisClient.del(key);
    }
}