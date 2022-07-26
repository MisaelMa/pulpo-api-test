import { Document, Schema as SchemaMongose, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

@Schema({
  collection: 'vehicles',
  timestamps: true,
})
export class Vehicles {
  _id: string;

  @ApiProperty({
    description: 'You can use a list of marca of vehicles',
    example: 'jeep',
    required: true,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  @Prop({ type: String })
  marca: string;

  @ApiProperty({
    description: 'You can use a years here',
    example: '2019',
    required: true,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  @Prop({ type: String })
  modelo: string;

  @ApiProperty({
    description: 'You can use a any color',
    example: 'green',
    required: true,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  @Prop({ type: String })
  color: string;

  @Prop({ type: String })
  fechaIngreso: string;

  @ApiProperty({
    description: 'You can use boolean',
    example: true,
    required: false,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  @Prop({ type: Boolean, default: false })
  estado: boolean;

  @ApiProperty({
    description:
      'You can use any string for user, cause no exist any realations',
    example: 'amir',
    required: false,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  @Prop({ type: String, default: false })
  asignado: string;
}

export type VehiclesDocument = Vehicles & Document;

export const VehiclesSchema = SchemaFactory.createForClass(Vehicles);
