import { Controller } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Crud } from 'nestjs-mongoose-crud';
import { Vehicles, VehiclesDocument } from './schema/vehicles.schema';
import { VehiclesService } from './vehicles.service';

@Crud({
    model: Vehicles,
})
@Controller('vehicles')
export class VehiclesController {
    crudOptions = {};
    model: ModelType<VehiclesDocument>;

    constructor(public service: VehiclesService) {
        this.model = service.model;
    }
}
