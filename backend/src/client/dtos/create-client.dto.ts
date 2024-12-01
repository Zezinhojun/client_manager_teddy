import { IsNotEmpty, IsString, IsNumber, MaxLength, Min } from 'class-validator';

export class CreateClientDTO {
    @IsNotEmpty({ message: 'Name is required' })
    @IsString()
    @MaxLength(255, { message: 'Name cannot exceed 255 characters' })
    name: string;

    @IsNotEmpty({ message: 'Salary is required' })
    @IsNumber({}, { message: 'Salary must be a valid number' })
    @Min(0, { message: 'Salary must be at least 0' })
    salary: number;

    @IsNotEmpty({ message: 'Company value is required' })
    @IsNumber({}, { message: 'Company value must be a valid number' })
    companyValue: number;

}
