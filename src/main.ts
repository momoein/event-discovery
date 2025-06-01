import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/logging.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new LoggingInterceptor());

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Event Discovery API')
    .setDescription('API for discovering and managing events')
    .setVersion('1.0')
    .addTag('events')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document); // Available at /swagger

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
