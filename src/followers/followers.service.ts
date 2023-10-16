import { Injectable } from '@nestjs/common';
import { FollowerRepository } from './followers.repository';
import { CreateFollower } from './dto/followers.create.dto';

@Injectable()
export class FollowerService {
  constructor(private readonly followerRepository: FollowerRepository) {}

  async followUser(follower: CreateFollower) {
    return await this.followerRepository.create(follower);
  }

  async removeFollower(id: string) {
    return await this.followerRepository.followerDelete(id);
  }

  async listFollower(user_id: string) {
    return await this.followerRepository.findUserFollowers(user_id);
  }
}
