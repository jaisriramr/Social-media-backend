import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BookmarkDocument = Bookmark & Document;

@Schema({ timestamps: true })
export class Bookmark {
  @Prop({ required: true })
  user_id: Types.ObjectId;

  @Prop({ required: true })
  post_id: string;
}

export const BookmarkSchema = SchemaFactory.createForClass(Bookmark);
