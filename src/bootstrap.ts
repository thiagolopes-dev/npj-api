import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

export async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({
        origin: ['http://localhost:4200', 'https://app.npj.com.br'],
        methods: 'GET, HEAD, PUT, PATCH,POST, DELETE',
        allowedHeaders: 'Authoration, Content-type',
        credentials: true,
    });
    const config = new DocumentBuilder()
        .setTitle('NPJ API')
        .setDescription('API NPJ ANHANGUERA')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    await app.listen(3000);
}
