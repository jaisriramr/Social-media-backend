import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
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
}
