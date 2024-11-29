import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsOptional, IsString, MaxLength, IsNotEmpty } from 'class-validator';
import { Employee } from 'src/employee/entity/employee.entity';
import { CrudValidationGroups } from '@dataui/crud';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('companies')
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @IsString({ always: true })
    @MaxLength(255, { always: true })
    @Column({ type: 'varchar', length: 255 })
    name: string;

    @OneToMany(() => Employee, employee => employee.company)
    employees: Employee[];
}