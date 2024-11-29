import { IsNotEmpty, IsString, IsNumber, MaxLength, IsOptional, Min } from 'class-validator';

export class CreateEmployeeDTO {
    @IsNotEmpty({ message: 'Name is required' })
    @IsString()
    @MaxLength(255, { message: 'Name cannot exceed 255 characters' })
    name: string;

    @IsNotEmpty({ message: 'Salary is required' })
    @IsNumber({}, { message: 'Salary must be a valid number' })
    @Min(0, { message: 'Salary must be at least 0' })
    salary: number;

    @IsOptional()
    @IsNumber({}, { message: 'Company ID must be a valid number' })
    companyId: number;
}
