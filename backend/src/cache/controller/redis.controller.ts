import { Controller, Post, Body, Get, Delete } from '@nestjs/common';
import { RedisService } from '../service/redis.service';

@Controller('cache')
export class RedisController {
    private readonly key = 'username';
    constructor(private readonly redisService: RedisService) { }

    @Post()
    async setCache(@Body() body: { value: string }) {
        await this.redisService.set(this.key, body.value, 2 * 60 * 60);
        return true;
    }

    @Get()
    async getCache() {
        const value = await this.redisService.get(this.key);
        return { value };
    }

    @Delete()
    async deleteCache() {
        await this.redisService.delete(this.key);
        return { message: 'Valor deletado do cache' };
    }
}