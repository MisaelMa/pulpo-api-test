import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegistroController } from './registro.controller';
import { RegistroService } from './registro.service';
import { Registro, RegistroSchema } from './schema/registro.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Registro.name, schema: RegistroSchema },
    ]),
  ],
  controllers: [RegistroController],
  providers: [RegistroService],
})
export class RegistroModule { }
