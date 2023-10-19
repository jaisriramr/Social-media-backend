import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreatePostDto {
  @ApiProperty()
  @IsNotEmpty()
  user_id: Types.ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  post_id: string;

  @ApiProperty()
  @IsNotEmpty()
  caption: string;

  @ApiProperty()
  @IsNotEmpty()
  post_url: string;

  @ApiProperty()
  @IsNotEmpty()
  type: string;

  @ApiProperty()
  location: string;
}
