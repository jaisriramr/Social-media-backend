import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type LikeDocument = Like & Document;

@Schema({ timestamps: true })
export class Like {
  @Prop({ required: true })
  post_id: string;

  @Prop({ required: true })
  user_id: Types.ObjectId;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
