import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { JwtService } from '@nestjs/jwt';
import { CreatePostDto } from './dto/create.post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { nanoid } from 'nanoid';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private jwtService: JwtService,
  ) {}

  @Post('/create')
  @UseInterceptors(FileInterceptor('file'))
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() file: any,
  ) {
    try {
      const post_id = await nanoid(11);
      const postResponse = await this.postService.UploadFile(file);

      Object.assign(createPostDto, {
        post_id,
        post_url: postResponse.Location,
        Key: postResponse.Key,
        Bucket: postResponse.Bucket,
      });

      return this.postService.createPost(createPostDto);
    } catch (err) {
      throw new HttpException(err, 400);
    }
  }

  @Get('/get/:post_id')
  async readPost(@Param('post_id') id: string) {
    try {
      return await this.postService.readPost(id);
    } catch (err) {
      throw new HttpException(err, 400);
    }
  }

  @Get('/list/:user_id')
  async ListPost(@Param('user_id') user_id: string) {
    try {
      return await this.postService.ListPost(user_id);
    } catch (err) {
      throw new HttpException(err, 400);
    }
  }

  @Delete('/remove/:id')
  async removePost(@Param('id') id: string) {
    try {
      return await this.postService.removePost(id);
    } catch (err) {
      throw new HttpException(err, 400);
    }
  }
}
