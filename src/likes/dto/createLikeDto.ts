import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateLikeDto {
  @ApiProperty()
  @IsNotEmpty()
  user_id: Types.ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  post_id: string;
}
