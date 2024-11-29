import { Module } from '@nestjs/common';
import { redisProvider } from '../config/redis.config';
import { RedisService } from './service/redis.service';
import { RedisController } from './controller/redis.controller';

@Module({
    providers: [RedisService, redisProvider],
    controllers: [RedisController],
    exports: [RedisService],
})
export class RedisModule { }