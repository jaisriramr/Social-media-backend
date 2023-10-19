import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkBto } from './dto/createBookmarkDto';
import { Types } from 'mongoose';

@Controller('bookmark')
export class BookmarksController {
  constructor(private readonly BookmarkService: BookmarkService) {}

  @Post('/create')
  async create(@Body() createBookmarkDto: CreateBookmarkBto) {
    try {
      createBookmarkDto.user_id = new Types.ObjectId(createBookmarkDto.user_id);

      return await this.BookmarkService.create(createBookmarkDto);
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  @Get('/read/:id')
  async readOne(@Param('id') id: string) {
    try {
      return await this.BookmarkService.read(id);
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  @Get('/list/:id')
  async ListBookmarks(@Param('id') id: string) {
    try {
      return await this.BookmarkService.readAll(id);
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  @Delete('/remove/:id')
  async remove(@Param('id') id: string) {
    try {
      return await this.BookmarkService.remove(id);
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }
}
