import { EmployeeResponseDTO } from "src/employee/dtos/employee-response.dto";

export class CompanyResponseDTO {
    id: number;
    name: string;
    employees: EmployeeResponseDTO[];
}