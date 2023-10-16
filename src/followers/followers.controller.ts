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
import { FollowerService } from './followers.service';
import { JwtService } from '@nestjs/jwt';
import { CreateFollower } from './dto/followers.create.dto';

@Controller('follower')
@UseGuards(AuthGuard)
export class FollowerController {
  constructor(
    private readonly followerService: FollowerService,
    private jwtService: JwtService,
  ) {}

  @Post('/create')
  async createFollower(@Body() createFollowerDto: CreateFollower) {
    try {
      return await this.followerService.followUser(createFollowerDto);
    } catch (err) {
      throw new HttpException(err, 400);
    }
  }

  @Get('/list/:user_id')
  async ListFollowers(@Param('user_id') user_id: string) {
    try {
      return await this.followerService.listFollower(user_id);
    } catch (err) {
      throw new HttpException(err, 400);
    }
  }

  @Delete('/remove/:user_id')
  async removeFollower(@Param('user_id') user_id: string) {
    try {
      return await this.followerService.removeFollower(user_id);
    } catch (err) {
      throw new HttpException(err, 400);
    }
  }
}
