import { Module } from '@nestjs/common';
import { FollowerRepository } from './followers.repository';
import { FollowerService } from './followers.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Follower, FollowerSchema } from './schemas/followers.schemas';
import { FollowerController } from './followers.controller';

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature([
      {
        name: Follower.name,
        schema: FollowerSchema,
      },
    ]),
  ],
  controllers: [FollowerController],
  providers: [FollowerRepository, FollowerService],
})
export class FollowerModule {}
