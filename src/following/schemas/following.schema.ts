import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FollowingDocument = Following & Document;

@Schema({ timestamps: true })
export class Following {
  @Prop({ required: true })
  follower_id: string;

  @Prop({ required: true })
  user_id: string;
}

export const FollowingSchema = SchemaFactory.createForClass(Following);
