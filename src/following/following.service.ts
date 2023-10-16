import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Following, FollowingDocument } from './schemas/following.schema';
import { CreateFollowing } from './dto/createFollowingDto';
import { Model } from 'mongoose';

@Injectable()
export class FollowingService {
  constructor(
    @InjectModel(Following.name)
    private followingModel: Model<FollowingDocument>,
  ) {}

  async create(follower: CreateFollowing) {
    const newFollower = await new this.followingModel(follower);
    return newFollower.save();
  }

  async followingDelete(id: string) {
    return this.followingModel.deleteOne({ follower_id: id });
  }

  async findUserFollowings(userId: string) {
    return this.followingModel.find({ userId });
  }
}
