import { Controller, Post, Body, Get, Delete } from '@nestjs/common';
import { RedisService } from '../service/redis.service';

@Controller('cache')
export class RedisController {
    constructor(private readonly redisService: RedisService) { }

    @Post()
    async setCache(@Body() body: { value: string }) {
        await this.redisService.set(body.value);
        return true;
    }

    @Get()
    async getCache() {
        const value = await this.redisService.get();
        return { value };
    }

    @Delete()
    async deleteCache() {
        await this.redisService.delete();
        return { message: 'Valor deletado do cache' };
    }
}