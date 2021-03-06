import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from '../user/user.schema';

export type PayoutDocument = Payout & Document;

@Schema({ timestamps: true })
export class Payout {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  payer: User;

  @Prop()
  email: string; // recipient email

  @Prop()
  amount: number;

  @Prop()
  currency: string;

  @Prop()
  title: string;

  @Prop()
  category: number;

  @Prop()
  token: string; // secret key
}

export const PayoutSchema = SchemaFactory.createForClass(Payout);

PayoutSchema.methods.toJSON = function (this: PayoutDocument) {
  const { token, ...payoutJSON } = this.toObject();
  return payoutJSON;
};
