import { Injectable } from '@nestjs/common';
import { Like, LikeDocument } from './schema/like.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateLikeDto } from './dto/createLikeDto';

@Injectable()
export class LikeRespository {
  constructor(@InjectModel(Like.name) private likeModel: Model<LikeDocument>) {}

  async create(like: CreateLikeDto) {
    const createdLike = new this.likeModel(like);
    return createdLike.save();
  }

  async removeLike(_id: string) {
    return await this.likeModel.deleteOne({ _id: new Types.ObjectId(_id) });
  }

  async ListLikes(post_id: string) {
    return await this.likeModel.find({ post_id: post_id });
  }
}
