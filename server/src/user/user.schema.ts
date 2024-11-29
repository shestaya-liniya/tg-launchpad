import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  static readonly TELEGRAM_ID = 'telegramId';
  static readonly USERNAME = 'username';


  @Prop({ required: true })
  telegramId: number;

  @Prop({ required: true })
  username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);