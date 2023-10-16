import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  fullname: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  salt: string;

  @Prop({ required: true })
  hashed_password: string;

  @Prop({ required: true })
  profile_picture_url: string;

  @Prop({ required: true })
  bio: string;

  @Prop({ required: true })
  joined_at: string;
}

export const userSchema = SchemaFactory.createForClass(User);
