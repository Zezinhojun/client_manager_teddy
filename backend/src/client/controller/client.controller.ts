import { Crud, CrudController, Override } from "@dataui/crud";
import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { Client } from "../entity/client.entity";
import { CreateClientDTO } from "../dtos/create-client.dto";
import { ClientsService } from "../service/client.service";

@Crud({
    model: {
        type: Client
    },
})

@Controller("clients")
export class ClientsController implements CrudController<Client> {
    constructor(public service: ClientsService) { }

    @Override('createOneBase')
    @Post()
    async create(
        @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
        createClientDto: CreateClientDTO
    ): Promise<Client> {
        return this.service.createEmployee(createClientDto)
    }
}