import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Like, LikeSchema } from './schema/like.schema';
import { LikeController } from './like.controller';
import { LikeRespository } from './like.repository';

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature([
      {
        name: Like.name,
        schema: LikeSchema,
      },
    ]),
  ],
  controllers: [LikeController],
  providers: [LikeRespository],
})
export class LikeModule {}
