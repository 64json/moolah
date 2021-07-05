import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from '../user/user.schema';

export type RequestDocument = Request & Document;

@Schema({ timestamps: true })
export class Request {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  payer: User | null;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  recipient: User;

  @Prop()
  email: string; // payer email

  @Prop()
  amount: number;

  @Prop()
  title: string;

  @Prop()
  category: number;
}

export const RequestSchema = SchemaFactory.createForClass(Request);
