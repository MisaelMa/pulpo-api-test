import { Document, Schema as SchemaMongose, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

@Schema({
  collection: 'registro',
  timestamps: true,
})
export class Registro {
  _id: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  age: string;

  @Prop({ type: String })
  dateOfBirth: string;

  @Prop({ type: String })
  dateOfRegistration: string;

  @Prop({ type: String })
  costo: string;
}

export type RegistroDocument = Registro & Document;

export const RegistroSchema = SchemaFactory.createForClass(Registro);
