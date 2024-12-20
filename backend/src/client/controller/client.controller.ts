import { Crud, CrudController, CrudRequest, Override, ParsedRequest } from "@dataui/crud";
import { Body, Controller, Patch, Post, ValidationPipe } from "@nestjs/common";
import { Client } from "../entity/client.entity";
import { CreateClientDTO } from "../dtos/create-client.dto";
import { ClientsService } from "../service/client.service";
import { RedisService } from "src/cache/service/redis.service";


@Crud({
    model: {
        type: Client
    },
})

@Controller("clients")
export class ClientsController implements CrudController<Client> {
    constructor(
        public service: ClientsService,
        private readonly redisService: RedisService
    ) { }

    @Override('createOneBase')
    @Post()
    async create(
        @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
        createClientDto: CreateClientDTO
    ): Promise<Client> {
        const client = this.service.createEmployee(createClientDto)
        await this.redisService.delete('clients');
        return client
    }

    @Override('getManyBase')
    async getClients(): Promise<Client[]> {
        const cachedClients = await this.redisService.get('clients')
        if (cachedClients) {
            return JSON.parse(cachedClients)
        }

        const clientsFromDb = await this.service.find()
        await this.redisService.set('clients', clientsFromDb, 2 * 60 * 60)
        return clientsFromDb
    }

    @Override('deleteOneBase')
    async deleteOne(
        @ParsedRequest() req: CrudRequest,
    ): Promise<void> {
        await this.service.deleteOne(req);
        await this.redisService.delete('clients');
    }

    @Override('updateOneBase')
    @Patch(':id')
    async updateOne(
        @ParsedRequest() req: CrudRequest,
        @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
        dto: Partial<Client>
    ): Promise<Client> {
        const updatedClient = await this.service.updateOne(req, dto);
        await this.redisService.delete('clients');
        return updatedClient;
    }



}
