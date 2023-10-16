import { updatePostDto } from './dto/update.post.dto';
import { CreatePostDto } from './dto/create.post.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import * as AWS from 'aws-sdk';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}
  Bucket = process.env.AWS_POST_BUCKET;
  s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_PK,
    secretAccessKey: process.env.AWS_S3_SK,
  });
  async createPost(createPostDto: CreatePostDto) {
    return await this.postRepository.create(createPostDto);
  }

  async readPost(id: string) {
    return await this.postRepository.readPost(id);
  }

  async ListPost(user_id: string) {
    return await this.postRepository.ListUserPost(user_id);
  }

  async updatePost(updatePostDto: updatePostDto) {
    return await this.postRepository.update(updatePostDto);
  }

  async removePost(id: string) {
    let post = await this.postRepository.readPost(id);

    if (post) {
      try {
        let rmFile = await this.removeFile(post.Key, post.Bucket);

        let response = await this.postRepository.removePost(id);
        return 'Removed Successfully';
      } catch (err) {
        throw new HttpException(err, 400);
      }
    } else {
      throw new HttpException('Post with that ID does not exists', 400);
    }
  }

  async removeFile(Key, Bucket) {
    console.log(Key, Bucket);
    return await this.s3.deleteObject({
      Bucket,
      Key,
    });
  }

  async UploadFile(file: any) {
    console.log(file);
    const { originalname } = file;

    return await this.s3_upload(
      file.buffer,
      this.Bucket,
      originalname,
      file.mimetype,
    );
  }

  async s3_upload(file, bucket, name, mimetype) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    };

    try {
      let s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (e) {
      console.log(e);
    }
  }
}
