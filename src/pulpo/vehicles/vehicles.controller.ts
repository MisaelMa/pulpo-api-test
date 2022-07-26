import {
    Controller,
    Get,
    Param,
    Post,
    Put,
    Body,
    Delete,
} from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import {
    ApiBody,
    ApiOperation,
    ApiQuery,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { Crud } from 'nestjs-mongoose-crud';
import {
    CrudOptionsWithModel,
    PaginateKeys,
} from 'nestjs-mongoose-crud/dist/crud.interface';
import { defaultPaginate } from 'nestjs-mongoose-crud/dist/crud-config';
import {
    CrudQuery,
    ICrudQuery,
} from 'nestjs-mongoose-crud/dist/crud-query.decorator';
import { Vehicles, VehiclesDocument } from './schema/vehicles.schema';
import { VehiclesService } from './vehicles.service';
import { get, merge } from 'lodash';

export class CrudPlaceholderDto {
    fake?: string;
    [key: string]: any;
}

@ApiBearerAuth()
@Crud({
    model: Vehicles,
})
@Controller('vehicles')
export class VehiclesController {
    // @ts-ignore
    crudOptions: CrudOptionsWithModel = {};
    model: ModelType<VehiclesDocument>;

    constructor(public service: VehiclesService) {
        this.model = service.model;
    }

    Get();
    @ApiOperation({ summary: 'Find all records', operationId: 'list' })
    @ApiQuery({
        name: 'query',
        type: String,
        required: false,
        description: 'Query options',
    })
    // @ts-ignore
    public index(@CrudQuery('query') query: ICrudQuery = {}) {
        const {
            where = get(this.crudOptions, 'routes.find.where', {}),
            limit = get(this.crudOptions, 'routes.find.limit', 10),
            page = 1,

            populate = get(this.crudOptions, 'routes.find.populate', undefined),
            sort = get(this.crudOptions, 'routes.find.sort', undefined),
            collation = undefined,
        } = query;
        let { skip = 0 } = query;
        if (skip < 1) {
            skip = (page - 1) * limit;
        }

        const paginateKeys: PaginateKeys | false = get(
            this.crudOptions,
            'routes.find.paginate',
            defaultPaginate
        );

        const find = async () => {
            const data = await this.model
                .find()
                .where(where)
                .skip(skip)
                .limit(limit)
                .sort(sort)
                .populate(populate)
                .collation(collation);
            if (paginateKeys !== false) {
                const total = await this.model.countDocuments(where);
                return {
                    [paginateKeys.total]: total,
                    [paginateKeys.data]: data,
                    [paginateKeys.lastPage]: Math.ceil(total / limit),
                    [paginateKeys.currentPage]: page,
                };
            }
            return data;
        };
        return find();
    }

    @Get(':id')
    @ApiBody({ type: Vehicles })
    @ApiOperation({ summary: 'Find a record' })
    findOne(
        @Param('id') id: string,
        @CrudQuery('query') query: ICrudQuery = {}
    ) {
        const {
            where = get(this.crudOptions, 'routes.findOne.where', {}),
            populate = get(
                this.crudOptions,
                'routes.findOne.populate',
                undefined
            ),
            select = get(this.crudOptions, 'routes.findOne.select', null),
        } = query;
        return this.model
            .findById(id)
            .populate(populate)
            .select(select)
            .where(where);
    }

    @Post()
    @ApiOperation({ summary: 'Create a record' })
    @ApiBody({ type: Vehicles })
    create(@Body() body: Vehicles) {
        const transform = get(this.crudOptions, 'routes.create.transform');
        if (transform) {
            body = transform(body);
        }
        return this.model.create(body);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a record' })
    @ApiBody({ type: Vehicles })
    update(@Param('id') id: string, @Body() body: Vehicles) {
        const transform = get(this.crudOptions, 'routes.update.transform');
        if (transform) {
            body = transform(body);
        }
        return this.model.findOneAndUpdate({ _id: id }, body, {
            new: true,
            upsert: false,
            runValidators: true,
        });
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a record' })
    delete(@Param('id') id: string) {
        return this.model.findOneAndRemove({ _id: id });
    }
}
