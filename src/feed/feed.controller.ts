import { Controller, Get, HttpException, Param, Post } from '@nestjs/common';
import { FeedService } from './feed.service';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get('/user/list/:user_id')
  async getUserFeed(@Param('user_id') user_id: string) {
    try {
      return await this.feedService.listUsersPost(user_id);
    } catch (err) {
      throw new HttpException(err, 400);
    }
  }

  @Get('/post/likes/:post_id')
  async getPostLikes(@Param('post_id') post_id: string) {
    try {
      return await this.feedService.listPostLikes(post_id);
    } catch (err) {
      throw new HttpException(err, 400);
    }
  }

  @Get('/post/comments/:post_id')
  async getPostComments(@Param('post_id') post_id: string) {
    try {
      return await this.feedService.listPostComments(post_id);
    } catch (err) {
      throw new HttpException(err, 400);
    }
  }
}
