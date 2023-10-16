import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { FollowingService } from './following.service';
import { JwtService } from '@nestjs/jwt';
import { CreateFollowing } from './dto/createFollowingDto';

@Controller('follower')
@UseGuards(AuthGuard)
export class FollowingController {
  constructor(
    private readonly followingService: FollowingService,
    private jwtService: JwtService,
  ) {}

  @Post('/create')
  async createFollower(@Body() createFollowingDto: CreateFollowing) {
    try {
      return await this.followingService.create(createFollowingDto);
    } catch (err) {
      throw new HttpException(err, 400);
    }
  }

  @Get('/list/:user_id')
  async ListFollowers(@Param('user_id') user_id: string) {
    try {
      return await this.followingService.findUserFollowings(user_id);
    } catch (err) {
      throw new HttpException(err, 400);
    }
  }

  @Delete('/remove/:user_id')
  async removeFollower(@Param('user_id') user_id: string) {
    try {
      return await this.followingService.followingDelete(user_id);
    } catch (err) {
      throw new HttpException(err, 400);
    }
  }
}
