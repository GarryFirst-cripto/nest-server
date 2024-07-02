import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('Сервер на базе NestJS')
    .setDescription('Документация REST API')
    .setVersion('1.0.2')
    .addTag('Мой проект "Nest"')
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document)

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
  })
}

start();
