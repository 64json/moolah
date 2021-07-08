import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [process.env.NODE_ENV === 'production' ? 'https://jasonpark.me' : 'http://localhost:3000'],
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 8000);
}

bootstrap();
