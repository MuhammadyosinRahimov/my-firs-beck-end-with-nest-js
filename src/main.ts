import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get ConfigService instance
  const configService = app.get(ConfigService);

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .addTag('Boards')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  // CORS Configuration
  app.enableCors({
    origin: configService.get<string[]>('CORS_ORIGINS', [
      'http://localhost:3001',
      'http://localhost:3000',
    ]),
    methods: 'GET,POST,PUT,DELETE,PATCH',
    allowedHeaders: 'Content-Type, Authorization',
  });

  // Start the server
  const port = configService.get<number>('PORT', 3011); // Default to 3011 if PORT is not set
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
