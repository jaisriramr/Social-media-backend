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
import { LikeRespository } from './like.repository';
import { CreateLikeDto } from './dto/createLikeDto';

@Controller('like')
export class LikeController {
  constructor(private readonly LikeService: LikeRespository) {}

  @Post('/create')
  async create(@Body() createLikeDto: CreateLikeDto) {
    try {
      return await this.LikeService.create(createLikeDto);
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  @Get('/list/:post_id')
  async ListLikes(@Param('post_id') post_id: string) {
    try {
      return await this.LikeService.ListLikes(post_id);
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  @Delete('/remove/:id')
  async removeLike(@Param('id') id: string) {
    try {
      return await this.LikeService.removeLike(id);
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }
}
