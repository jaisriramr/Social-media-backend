import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schema/post.schema';
import { Model, Types } from 'mongoose';
import { CreatePostDto } from './dto/create.post.dto';
import { updatePostDto } from './dto/update.post.dto';

@Injectable()
export class PostRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(post: CreatePostDto) {
    const newPost = new this.postModel(post);
    return await newPost.save();
  }

  async update(post: updatePostDto) {
    return await this.postModel.findByIdAndUpdate(
      { _id: new Types.ObjectId(post._id) },
      post,
      {
        new: true,
      },
    );
  }

  async removePost(id: string) {
    return await this.postModel.deleteOne({ post_id: id });
  }

  async readPost(id: string) {
    return await this.postModel.findOne({ post_id: id });
  }

  async ListUserPost(user_id: string) {
    return await this.postModel.find({ user_id: user_id });
  }
}
