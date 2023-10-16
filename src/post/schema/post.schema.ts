import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  caption: string;

  @Prop({ required: true })
  post_url: string;

  @Prop({})
  location: string;

  @Prop({ required: true })
  post_id: string;

  @Prop({ required: true })
  Key: string;

  @Prop({ required: true })
  Bucket: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
