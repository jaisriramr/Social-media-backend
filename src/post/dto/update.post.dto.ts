import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class updatePostDto {
  @ApiProperty()
  @IsNotEmpty()
  _id: string;

  @ApiProperty()
  @IsNotEmpty()
  user_id: string;

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
  location: string;
}
