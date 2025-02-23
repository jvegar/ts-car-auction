import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get allowed origins from environment variables
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];

  app.enableCors({
    origin: allowedOrigins,
    credentials: true, // Optional: if you need to allow credentials
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
