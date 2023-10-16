import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty()
  @IsNotEmpty()
  post_id: string;

  @ApiProperty()
  @IsNotEmpty()
  comment: string;

  @ApiProperty()
  likes: [];

  @ApiProperty()
  replay: [];
}
