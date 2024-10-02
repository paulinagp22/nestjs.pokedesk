import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Prefijo global para que las llamadas a la API sean /api/...
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
