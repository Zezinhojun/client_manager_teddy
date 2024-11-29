import { Crud, CrudController } from "@dataui/crud";
import { Employee } from "../entity/employee.entity";
import { Controller } from "@nestjs/common";
import { EmployeesService } from "../service/employee.service";

@Crud({
    model: {
        type: Employee
    }
})

@Controller("employees")
export class EmployeesController implements CrudController<Employee> {
    constructor(public service: EmployeesService) { }
}