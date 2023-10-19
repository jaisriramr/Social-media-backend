import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateBookmarkBto {
  @ApiProperty()
  @IsNotEmpty({ message: 'User ID is required' })
  user_id: Types.ObjectId;

  @ApiProperty()
  @IsNotEmpty({ message: 'Post ID is required' })
  post_id: string;
}
