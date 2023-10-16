import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateFollowing {
  @ApiProperty()
  @IsNotEmpty()
  userId: string; // the one who clicked the follow button of another user

  @ApiProperty()
  @IsNotEmpty()
  followingId: string; // the user who the user clicked to follow
}
