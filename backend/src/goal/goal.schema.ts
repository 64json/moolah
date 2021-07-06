import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from '../user/user.schema';

export type GoalDocument = Goal & Document;

@Schema({ timestamps: true })
export class Goal {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User;

  @Prop()
  emoji: string;

  @Prop()
  title: string;

  @Prop()
  amount: number;

  @Prop()
  currency: string;

  @Prop()
  deadline: string;
}

export const GoalSchema = SchemaFactory.createForClass(Goal);
