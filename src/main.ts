import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation.pipe';
// import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';

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

  app.useGlobalPipes(new ValidationPipe);

  // const jwtAuthGuard = app.get(JwtAuthGuard);
  // app.useGlobalGuards(jwtAuthGuard)

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
  })
}

start();
