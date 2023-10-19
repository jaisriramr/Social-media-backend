import { CreateBookmarkBto } from './dto/createBookmarkDto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Bookmark, BookmarkDocument } from './schemas/bookmark.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectModel(Bookmark.name) private bookmarkModel: Model<BookmarkDocument>,
  ) {}

  async create(CreateBookmarkBto: CreateBookmarkBto) {
    const newBookmark = await new this.bookmarkModel(CreateBookmarkBto);
    return newBookmark.save();
  }

  async read(id: string) {
    return await this.bookmarkModel.findOne({ _id: new Types.ObjectId(id) });
  }

  async readAll(id: string) {
    return await this.bookmarkModel.find({ user_id: new Types.ObjectId(id) });
  }

  async remove(id: string) {
    return await this.bookmarkModel.deleteOne({ _id: new Types.ObjectId(id) });
  }
}
