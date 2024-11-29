import { TypeOrmCrudService } from "@dataui/crud-typeorm";
import { Injectable } from "@nestjs/common";
import { Employee } from "../entity/employee.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class EmployeesService extends TypeOrmCrudService<Employee> {
    constructor(@InjectRepository(Employee) repo) {
        super(repo)
    }
}