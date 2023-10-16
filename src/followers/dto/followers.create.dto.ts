import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateFollower {
  @ApiProperty()
  @IsNotEmpty()
  userId: string; // the one who clicked the follow button of another user

  @ApiProperty()
  @IsNotEmpty()
  followerId: string; // the user who the user clicked to follow
}
