import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsOptional, IsString, IsNumber, MaxLength, IsNotEmpty, Min } from 'class-validator';
import { CrudValidationGroups } from '@dataui/crud';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('clients')
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty({ groups: [CREATE] })
    @IsOptional({ groups: [UPDATE] })
    @IsString({ always: true })
    @MaxLength(255, { always: true })
    @Column({ type: 'varchar', length: 255 })
    name: string;

    @IsNotEmpty({ groups: [CREATE] })
    @IsOptional({ groups: [UPDATE] })
    @IsNumber({}, { always: true })
    @Min(0, { always: true })
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    salary: number;

    @IsNotEmpty({ groups: [CREATE] })
    @IsOptional({ groups: [UPDATE] })
    @IsNumber({}, { always: true })
    @Min(0, { always: true })
    @Column({ type: 'decimal', precision: 15, scale: 2, name: 'company_value' })
    companyValue: number;

    @CreateDateColumn({ type: 'timestamp' })
    createAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updateAt: Date;
}
