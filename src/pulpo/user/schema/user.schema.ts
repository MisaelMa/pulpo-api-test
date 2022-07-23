import { Document, Schema as SchemaMongose } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum RoleEnum {
  CUSTOMER = 'customer',
  CS = 'cs',
  QA = 'qa',
  ADMIN = 'admin',
}

@Schema({
  collection: 'users',
  timestamps: true,
})
export class User {
  _id: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, lowercase: true, required: true, unique: true })
  name: string;

  @Prop({ type: String, default: null })
  picture: string | null;

  @Prop({
    type: String,
    enum: ['guest', 'admin'],
    default: 'guest',
  })
  role: RoleEnum;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, default: '' })
  token: string;

  @Prop({ type: Boolean, default: false })
  email_checked: boolean;

  @Prop({ type: Array, default: [] })
  webPush: any;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
