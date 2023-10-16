import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Following, FollowingSchema } from './schemas/following.schema';
import { FollowingController } from './following.controller';
import { FollowingService } from './following.service';

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature([
      {
        name: Following.name,
        schema: FollowingSchema,
      },
    ]),
  ],
  controllers: [FollowingController],
  providers: [FollowingService],
})
export class FollowingModule {}
