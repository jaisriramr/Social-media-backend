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
import { Types } from 'mongoose';

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
      console.log('DDDD ', createPostDto, file);

      const post_id = await nanoid(11);
      const postResponse = await this.postService.UploadFile(file);
      console.log('CREATE ', postResponse);

      createPostDto.user_id = new Types.ObjectId(createPostDto.user_id);

      Object.assign(createPostDto, {
        post_id,
        post_url: postResponse.Location,
        Key: postResponse.Key,
        Bucket: postResponse.Bucket,
        type: file.mimetype,
      });

      return this.postService.createPost(createPostDto);
    } catch (err) {
      console.log('EEEE ', err);
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
