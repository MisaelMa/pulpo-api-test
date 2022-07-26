/* eslint-disable prettier/prettier */
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CoreModule } from '../../core';
import { Vehicles, VehiclesSchema } from './schema/vehicles.schema';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';

describe('VehiclesController', () => {
  let controller: VehiclesController;
  let spyService: VehiclesService

  beforeEach(async () => {
    const model = {
      find: jest.fn(() => model),
      select: jest.fn(() => model),
      create: jest.fn(() => []),
      findById: jest.fn(() => model),
      populate: jest.fn(() => model),
      skip: jest.fn(() => model),
      limit: jest.fn(() => model),
      sort: jest.fn(() => model),
      collation: jest.fn(() => model),
      where: jest.fn(() => model),
      countDocuments: jest.fn(() => model),
    }
    const ApiServiceProvider = {
      provide: VehiclesService,
      useFactory: () => ({
        model
      })
    }
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CoreModule,
        MongooseModule.forFeature([
          { name: Vehicles.name, schema: VehiclesSchema },
        ]),
      ],
      controllers: [VehiclesController],
      providers: [VehiclesService, ApiServiceProvider],
    }).compile();

    controller = module.get<VehiclesController>(VehiclesController);
    spyService = module.get<VehiclesService>(VehiclesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('controller', () => {
    it('should return an array of vehicles with pagination', async () => {
      const dataIndex = await controller.index()
      expect(dataIndex).toBeDefined();
      expect(spyService.model.find).toHaveBeenCalled();
    });

    it('should return an object with _id 62dc46f622c7c2a90c4406aa', async () => {
      const findOne = await controller.findOne('62dc46f622c7c2a90c4406aa')
      expect(spyService.model.findById).toHaveBeenCalled();

    });

    it("should created one item and return !null", () => {
      const dto = new Vehicles();
      const result = controller.create(dto)
      expect(result).not.toEqual(null);
      expect(spyService.model.create).toHaveBeenCalled();
      expect(spyService.model.create).toHaveBeenCalledWith(dto);
    })
  });


});
