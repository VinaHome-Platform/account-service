import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({
  collection: 'account',
  timestamps: true,
})
export class Account extends Document {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  number_phone: string;

  @Prop()
  full_name: string;

  @Prop()
  status: boolean;
}
export const AccountSchema = SchemaFactory.createForClass(Account);
