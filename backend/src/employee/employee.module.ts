import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Employee } from "./entity/employee.entity";
import { EmployeesService } from "./service/employee.service";
import { EmployeesController } from "./controller/employee.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Employee])],
    providers: [EmployeesService],
    controllers: [EmployeesController],
    exports: [EmployeesService]
})

export class EmployeesModule { }