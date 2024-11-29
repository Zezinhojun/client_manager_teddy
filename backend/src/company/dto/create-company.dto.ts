import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCompanyDTO {
    @IsNotEmpty({ message: 'Company name is required' })
    @IsString()
    @MaxLength(255, { message: 'Company name cannot exceed 255 characters' })
    name: string;
}
