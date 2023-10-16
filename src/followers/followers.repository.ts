import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Follower, FollowerDocument } from './schemas/followers.schemas';
import { FollowerModule } from './followers.module';
import { CreateFollower } from './dto/followers.create.dto';
import { Model } from 'mongoose';

@Injectable()
export class FollowerRepository {
  constructor(
    @InjectModel(Follower.name) private followerModel: Model<FollowerDocument>,
  ) {}

  async create(follower: CreateFollower) {
    const newFollower = await new this.followerModel(follower);
    return newFollower.save();
  }

  async followerDelete(id: string) {
    return this.followerModel.deleteOne({ follower_id: id });
  }

  async findUserFollowers(userId: string) {
    return this.followerModel.find({ userId });
  }
}
