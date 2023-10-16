import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/createCommentDto';
import { UpdateCommentDto } from './dto/updateCommentDto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private CommentModel: Model<CommentDocument>,
  ) {}

  async create(comment: CreateCommentDto) {
    const createdComment = new this.CommentModel(comment);
    return await createdComment.save();
  }

  async listCommentForPost(post_id: string) {
    return await this.CommentModel.find({ post_id: post_id });
  }

  async EditComment(comment: UpdateCommentDto) {
    return await this.CommentModel.findOneAndUpdate(
      { _id: new Types.ObjectId(comment._id) },
      comment,
      { new: true },
    );
  }

  async removeComment(_id: string) {
    return await this.CommentModel.deleteOne({ _id: new Types.ObjectId(_id) });
  }

  async readComment(_id: string) {
    return await this.CommentModel.findOne({ _id: new Types.ObjectId(_id) });
  }
}
