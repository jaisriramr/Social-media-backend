import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from 'src/post/schema/post.schema';
import { Like, LikeSchema } from 'src/likes/schema/like.schema';
import { Comment, CommentSchema } from 'src/comment/schemas/comment.schema';
import { FeedController } from './feed.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostSchema,
      },
      {
        name: Like.name,
        schema: LikeSchema,
      },
      {
        name: Comment.name,
        schema: CommentSchema,
      },
    ]),
  ],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
