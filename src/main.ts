import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // ✅ Initialize app first

  // ✅ Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('My API') // API title
    .setDescription('API documentation') // API description
    .setVersion('1.0') // Version
    .addTag('Boards') // Tag for categorization
    .build();

  const document = SwaggerModule.createDocument(app, config); // ✅ Use `app` instead of `boards`
  SwaggerModule.setup('swagger', app, document); // ✅ Use `app`

  await app.listen(process.env.PORT ?? 3105);
}
bootstrap();
