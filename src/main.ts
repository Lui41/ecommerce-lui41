import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environment } from './config/environment';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
      .setTitle('Ecommerce API')
      .setDescription('Documentación de la API')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('API', app, document);

  const PORT = environment.PORT;
  const HOST = environment.HOST;

  await app.listen(PORT);

  console.log(`Servidor escuchando en http://${HOST}:${PORT}/`);
  console.log(`Swagger disponible en http://${HOST}:${PORT}/API`);
}

bootstrap();