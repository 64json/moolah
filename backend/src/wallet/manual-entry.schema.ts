import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from '../user/user.schema';

export type ManualEntryDocument = ManualEntry & Document;

@Schema({ timestamps: true })
export class ManualEntry {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User;

  @Prop()
  amount: number;

  @Prop()
  title: string;

  @Prop()
  category: number;
}

export const ManualEntrySchema = SchemaFactory.createForClass(ManualEntry);
