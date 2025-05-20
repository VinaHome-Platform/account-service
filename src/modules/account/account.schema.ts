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
  email: string;

  @Prop()
  address: string;

  @Prop()
  date_of_birth: Date;

  @Prop()
  gender: string;

  @Prop()
  status: boolean;

  @Prop()
  role: string;

  @Prop()
  account_type: string;

  @Prop({ type: Object })
  accept_app: {
    bms: boolean;
    cms: boolean;
    ams: boolean;
    driver: boolean;
  };

  @Prop()
  company_id: number;
}
export const AccountSchema = SchemaFactory.createForClass(Account);
