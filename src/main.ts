import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import { json, urlencoded } from 'express';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(json({ limit: '1mb' }));
  app.use(urlencoded({ limit: '1mb', extended: true }));
  app.use(cors());

  // Swagger documentation setup
  const config = new DocumentBuilder()
    .setTitle('SM Dev Backend')
    .setDescription('Social Media Development')
    .setVersion('1.0')
    .addTag('SM Dev APIs')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  await app.listen(3000);
}
bootstrap();
