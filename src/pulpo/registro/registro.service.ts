import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Registro, RegistroDocument } from './schema/registro.schema';

@Injectable()
export class RegistroService {
    constructor(
        @InjectModel(Registro.name)
        public model: ModelType<RegistroDocument, Registro>
    ) { }
}
