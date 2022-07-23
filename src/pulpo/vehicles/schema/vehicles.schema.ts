import { Document, Schema as SchemaMongose, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'vehicles',
  timestamps: true,
})
export class Vehicles {
  _id: string;

  @Prop({ type: String })
  marca: string;

  @Prop({ type: String })
  modelo: string;

  @Prop({ type: String })
  color: string;

  @Prop({ type: String })
  fechaIngreso: string;

  @Prop({ type: Boolean, default: false })
  estado: boolean;

  @Prop({ type: String, default: false })
  asignado: string;
}

export type VehiclesDocument = Vehicles & Document;

export const VehiclesSchema = SchemaFactory.createForClass(Vehicles);
