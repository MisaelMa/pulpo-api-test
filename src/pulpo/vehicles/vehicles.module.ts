import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Vehicles, VehiclesSchema } from './schema/vehicles.schema';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Vehicles.name, schema: VehiclesSchema },
    ]),
  ],
  controllers: [VehiclesController],
  providers: [VehiclesService],
})
export class VehiclesModule { }
