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
          user_id: user_id,
        },
      },
      {
        $lookup: {
          from: 'likes',
          localField: 'post_id',
          foreignField: 'post_id',
          as: 'post_like',
        },
      },
      {
        $lookup: {
          from: 'comments',
          localField: 'post_id',
          foreignField: 'post_id',
          as: 'post_comment',
        },
      },
      {
        $project: {
          _id: 1,
          post_id: 1,
          user_id: 1,
          caption: 1,
          location: 1,
          Key: 1,
          noOfLikes: { $size: '$post_like' },
          noOfComments: { $size: '$post_comment' },
        },
      },
    ];

    return await this.postModel.aggregate(pipeline);
  }

  async listPostLikes(post_id: string) {
    const pipeline = [
      {
        $match: {
          post_id: post_id,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'like_users',
        },
      },
      {
        $project: {
          _id: 1,
          'like_users.username': 1,
          'like_users.bio': 1,
          'like_users._id': 1,
          'like_users.profile_picture_url': 1,
        },
      },
    ];

    return await this.likeModel.aggregate(pipeline);
  }

  async listPostComments(post_id: string) {
    const pipeline = [];

    return await this.postModel.aggregate(pipeline);
  }
}
