import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Company } from '../../company/entity/company.entity';

@Entity('employees')
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    salary: number;

    @ManyToOne(() => Company, company => company.employees)
    @JoinColumn({ name: 'companyId' })
    company: Company;

    @CreateDateColumn({ type: 'timestamp' })
    createAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updateAt: Date;
}
