import { Module } from '@nestjs/common';
import { Company } from './entity/company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesController } from './controller/company.controller';
import { CompaniesService } from './service/company.service';

@Module({
    imports: [TypeOrmModule.forFeature([Company])],
    providers: [CompaniesService],
    controllers: [CompaniesController],
    exports: [CompaniesService],
})

export class CompaniesModule { }
