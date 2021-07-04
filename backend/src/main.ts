import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'https://jasonpark.me'],
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 8000);
}

bootstrap();
