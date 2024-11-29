import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Company } from "../entity/company.entity";
import { TypeOrmCrudService } from "@dataui/crud-typeorm";

@Injectable()
export class CompaniesService extends TypeOrmCrudService<Company> {
    constructor(@InjectRepository(Company) repo) {
        super(repo);
    }
}