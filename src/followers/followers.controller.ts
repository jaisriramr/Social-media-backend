import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { FollowerService } from './followers.service';
import { JwtService } from '@nestjs/jwt';

@Controller('follower')
@UseGuards(AuthGuard)
export class FollowerController {
  constructor(
    private readonly followerService: FollowerService,
    private jwtService: JwtService,
  ) {}

  @Post()
  createFollower() {}
}
