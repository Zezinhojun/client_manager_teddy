
import { Module } from '@nestjs/common';
import { databaseProviders } from './typeorm.config';

@Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule { }
