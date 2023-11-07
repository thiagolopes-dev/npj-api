import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'dev'}` });

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const config = new DocumentBuilder()
    .setTitle('Aplicativo NPJ')
    .setDescription('Endpoints API NPJ')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'http://10.0.112.200'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Authorization, Content-Type',
    credentials: true,
  });

  let port;
  switch (configService.get('NODE_ENV')) {
    case 'production':
      port = 3001;
      break;
    case 'homolog':
      port = 3002;
      break;
    default:
      port = 3001;
      break;
  }

  await app.listen(port);
}
bootstrap();
