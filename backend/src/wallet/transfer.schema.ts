import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from '../user/user.schema';

export type TransferDocument = Transfer & Document;

@Schema({ timestamps: true })
export class Transfer {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  payer: User | null;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  recipient: User;

  @Prop()
  email: string; // payer email

  @Prop()
  amount: number;

  @Prop()
  currency: string;

  @Prop()
  title: string;

  @Prop()
  category: number;

  @Prop()
  actionDataId: string; // rapyd-end
}

export const TransferSchema = SchemaFactory.createForClass(Transfer);
