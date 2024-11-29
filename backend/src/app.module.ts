import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './company/company.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { EmployeesModule } from './employee/employee.module';
import { RedisModule } from './cache/redis.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CompaniesModule,
    EmployeesModule,
    RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
