import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  country: string;

  @Prop()
  walletId: string;

  @Prop()
  walletContactId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
