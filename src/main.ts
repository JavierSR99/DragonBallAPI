import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  //#region Configuración de app
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Ignora propiedades que no están en el DTO
      forbidNonWhitelisted: true, // Falla si se envían propiedades no deseadas
      transform: true // Convierte payloads a instancias de clases DTO
    })
  );
  //#endregion

  //#region Servir archivos estáticos
  app.useStaticAssets(join(__dirname, '..', 'assets'), {
    prefix: '/assets/'
  });
  //#endregion

  //#region Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Dragon Ball API')
    .setDescription('Documentación API en Nest.JS')
    .build();

  const document = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);
  //#endregion

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
