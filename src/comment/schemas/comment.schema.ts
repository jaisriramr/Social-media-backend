import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment {
  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  post_id: string;

  @Prop({ required: true })
  comment: string;

  @Prop({})
  like: [];

  @Prop({})
  replay: [];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
