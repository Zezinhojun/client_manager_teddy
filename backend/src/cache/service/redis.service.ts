import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
    private readonly cacheKey = 'username';
    constructor(
        @Inject('REDIS_CLIENT') private readonly redisClient: Redis
    ) { }

    async set(value: string): Promise<void> {
        await this.redisClient.set(this.cacheKey, value, 'EX', 2 * 60 * 60);
    }

    async get(): Promise<string | null> {
        return await this.redisClient.get(this.cacheKey);
    }

    async delete(): Promise<void> {
        await this.redisClient.del(this.cacheKey);
    }
}