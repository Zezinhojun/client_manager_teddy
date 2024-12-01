import { TypeOrmCrudService } from "@dataui/crud-typeorm";
import { Injectable } from "@nestjs/common";
import { Client } from "../entity/client.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { CreateClientDTO } from "../dtos/create-client.dto";

@Injectable()
export class ClientsService extends TypeOrmCrudService<Client> {
    constructor(
        @InjectRepository(Client) clientRepo: Repository<Client>,
    ) {
        super(clientRepo)
    }

    async createEmployee(createClientDto: CreateClientDTO): Promise<Client> {
        const employee = this.repo.create(createClientDto);
        return this.repo.save(employee);
    }
}