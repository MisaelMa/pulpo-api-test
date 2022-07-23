import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Vehicles, VehiclesDocument } from './schema/vehicles.schema';

@Injectable()
export class VehiclesService {
    constructor(
        @InjectModel(Vehicles.name)
        public model: ModelType<VehiclesDocument, Vehicles>,
    ) { }
}
