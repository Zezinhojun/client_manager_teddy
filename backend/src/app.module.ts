import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

import { RedisModule } from './cache/redis.module';
import { ClientsModule } from './client/client.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ClientsModule,
    RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
