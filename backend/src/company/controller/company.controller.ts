import { Controller } from "@nestjs/common";
import { Company } from "../entity/company.entity";
import { CompaniesService } from "../service/company.service";
import { Crud, CrudController } from "@dataui/crud";

@Crud({
    model: {
        type: Company,
    },
})
@Controller("companies")
export class CompaniesController implements CrudController<Company> {
    constructor(public service: CompaniesService) { }
}