import { RedisModule } from './../cache/redis.module';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Client } from "./entity/client.entity";
import { ClientsController } from "./controller/client.controller";
import { ClientsService } from "./service/client.service";

@Module({
    imports: [TypeOrmModule.forFeature([Client]), RedisModule],
    providers: [ClientsService],
    controllers: [ClientsController],
    exports: [ClientsService]
})

export class ClientsModule { }