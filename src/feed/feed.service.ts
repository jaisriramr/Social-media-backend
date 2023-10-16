import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { Comment, CommentDocument } from 'src/comment/schemas/comment.schema';
import { Like, LikeDocument } from 'src/likes/schema/like.schema';
import { Post, PostDocument } from 'src/post/schema/post.schema';

@Injectable()
export class FeedService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(Like.name) private likeModel: Model<LikeDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async listUsersPost(user_id: string) {
    const pipeline: any = [
      {
        $match: {
          user_id: String(user_id),
        },
      },
      {
        $lookup: {
          from: 'likes',
          localField: 'post_id',
          foreignField: 'post_id',
          as: 'post_likes',
        },
      },
      {
        $lookup: {
          from: 'comments',
          localField: 'post_id',
          foriegnField: 'post_id',
          as: 'post_comments',
        },
      },
      {
        $project: {
          _id: 0,
          user_id: 1,
          caption: 1,
          post_url: 1,
          location: 1,
          post_id: 1,
          Key: 1,
          Bucket: 1,
          'post_likes.user_id': 1,
          'post_comments.user_id': 1,
          'post_comments.comment': 1,
          'post_comments.like': 1,
          'post_comments.replay': 1,
        },
      },
    ];

    return await this.postModel.aggregate(pipeline);
  }
}
