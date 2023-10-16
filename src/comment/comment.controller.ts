import { JwtService } from '@nestjs/jwt';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/createCommentDto';
import { UpdateCommentDto } from './dto/updateCommentDto';

@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private jwtService: JwtService,
  ) {}

  @Post('/create')
  async createComment(@Body() comment: CreateCommentDto) {
    try {
      return await this.commentService.create(comment);
    } catch (err) {
      throw new HttpException(err, 400);
    }
  }

  @Put('/update')
  async editComment(@Body() comment: UpdateCommentDto) {
    try {
      return await this.commentService.EditComment(comment);
    } catch (err) {
      throw new HttpException(err, 400);
    }
  }

  @Get('/list/:post_id')
  async ListComments(@Param('post_id') post_id: string) {
    try {
      return await this.commentService.listCommentForPost(post_id);
    } catch (err) {
      throw new HttpException(err, 400);
    }
  }

  @Delete('/remove/:id')
  async removeComment(@Param('id') id: string) {
    try {
      return await this.commentService.removeComment(id);
    } catch (err) {
      throw new HttpException(err, 400);
    }
  }

  @Get('/get/:id')
  async readComment(@Param('id') id: string) {
    try {
      return await this.commentService.readComment(id);
    } catch (err) {
      throw new HttpException(err, 400);
    }
  }
}
