import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FollowerDocument = Follower & Document;

@Schema({ timestamps: true })
export class Follower {
  @Prop({ required: true })
  follower_id: string;

  @Prop({ required: true })
  user_id: string;
}

export const FollowerSchema = SchemaFactory.createForClass(Follower);
