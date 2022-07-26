import { Controller } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Crud } from 'nestjs-mongoose-crud';
import { RegistroService } from './registro.service';
import { Registro, RegistroDocument } from './schema/registro.schema';

@Crud({
    model: Registro,
})
@Controller('registro')
export class RegistroController {
    // @ts-ignore
    crudOptions = {};
    model: ModelType<RegistroDocument>;

    constructor(public service: RegistroService) {
        this.model = service.model;
    }
}
