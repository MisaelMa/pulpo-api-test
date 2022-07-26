/* eslint-disable prettier/prettier */
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CoreModule } from '../../core';
import { Vehicles, VehiclesSchema } from './schema/vehicles.schema';
import { VehiclesService } from './vehicles.service';

describe('VehiclesService', () => {
  let service: VehiclesService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: VehiclesService,
      useFactory: () => ({
        model: {
          create: jest.fn(() => []),
          findById: jest.fn(() => []),
        }
      })
    }
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CoreModule,
        MongooseModule.forFeature([
          { name: Vehicles.name, schema: VehiclesSchema },
        ]),
      ],
      providers: [VehiclesService, ApiServiceProvider],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be findOne', async () => {

    const data = await service.model.findById('62dc46f622c7c2a90c4406aa')
    expect(service.model.findById).toHaveBeenCalled();
  });
});
