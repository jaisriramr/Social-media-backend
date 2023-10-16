import { Injectable } from '@nestjs/common';
import { UsersRepository } from './user.repository';
import { ObjectId } from 'mongodb';
import { User } from './schemas/user.schemas';

import { UpdateUserDto } from './dto/update.user.dto';
import { RegisterUserDto } from './dto/register.user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async registerUser(registerUserDto: RegisterUserDto) {
    return await this.usersRepository.create(registerUserDto);
  }

  async findByUsername(username: string) {
    return await this.usersRepository.findByUsername(username);
  }

  async removeUser(username: string) {
    return await this.usersRepository.removeUser(username);
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(updateUserDto);
  }
}
