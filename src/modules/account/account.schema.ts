import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'accounts',
  timestamps: true,
})
export class Account extends Document {
  @Prop()
  username: string;

  @Prop()
  password: string;
}
export const AccountSchema = SchemaFactory.createForClass(Account);
