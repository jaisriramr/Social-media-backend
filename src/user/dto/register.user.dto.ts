import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  fullname: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  hashed_password: string;

  @ApiProperty()
  @IsNotEmpty()
  salt: string;

  @ApiProperty()
  @IsNotEmpty()
  profile_picture_url: string;

  @ApiProperty()
  @IsNotEmpty()
  bio: string;
}
