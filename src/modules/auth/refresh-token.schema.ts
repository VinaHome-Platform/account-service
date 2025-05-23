import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class RefreshToken extends Document {
  @Prop({ required: true })
  token: string;
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  account_id: mongoose.Schema.Types.ObjectId;
  @Prop({ required: true })
  company_id: number;
  @Prop({ required: true })
  role: string;
  @Prop({ required: true })
  expiryDate: Date;
}
export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
