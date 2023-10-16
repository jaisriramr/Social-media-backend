import { Injectable } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schemas';
import { InjectModel } from '@nestjs/mongoose';

import { UpdateUserDto } from './dto/update.user.dto';
import { RegisterUserDto } from './dto/register.user.dto';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: RegisterUserDto) {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findByUsername(username: string) {
    return await this.userModel.findOne({ username: username });
  }

  async removeUser(username: string) {
    return await this.userModel.deleteOne({ username: username });
  }

  async update(user: UpdateUserDto) {
    return await this.userModel.findOneAndUpdate(user);
  }
}
