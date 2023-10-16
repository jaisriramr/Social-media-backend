import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return 'Alll finedee';
  }

  @Get('/get/:username')
  async findUser(@Param('username') username: string) {
    try {
      const user = await this.usersService.findByUsername(username);
      if (!user) {
        throw new HttpException('User with that username does not exists', 404);
      } else {
        user.hashed_password = undefined;
        user.salt = undefined;
        return user;
      }
    } catch (err) {
      console.log(err);
      throw new HttpException(err, 400);
    }
  }

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const userExist = await this.usersService.findByUsername(
        createUserDto.username,
      );

      if (userExist) {
        throw new HttpException('User already exist', 409);
      } else {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(createUserDto.password, salt);

        const userQuery = {
          username: createUserDto.username,
          fullname: createUserDto.fullname,
          email: createUserDto.email,
          hashed_password: hash,
          salt: salt,
          profile_picture_url: process.env.SM_USER_URL,
          bio: 'Sm Dev App',
          joined_at: new Date().toISOString(),
        };

        return await this.usersService.registerUser(userQuery);
      }
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  @Post('/login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    try {
      let userResponse: any = await this.usersService.findByUsername(username);

      if (!userResponse) {
        throw new HttpException('User does not exist', 404);
      } else {
        const compare = await bcrypt.compare(
          password,
          userResponse.hashed_password,
        );

        if (compare == false) {
          throw new HttpException('Password is incorrect!', 401);
        } else {
          const jwtUserData: any = {
            username: userResponse.username,
            email: userResponse.email,
            fullname: userResponse.fullname,
            _id: userResponse._id,
            profile_picture_url: userResponse.profile_picture_url,
            bio: userResponse.bio,
            joined_at: userResponse.joined_at,
            created_at: userResponse.createdAt,
            updated_at: userResponse.updatedAt,
          };

          const token = await this.jwtService.sign(jwtUserData, {
            secret: process.env.JWT_SECRET,
            expiresIn: '1d',
          });
          return {
            token,
          };
        }
      }
    } catch (err) {
      console.log('Err ', err);
      throw new HttpException(err, 500);
    }
  }
}
