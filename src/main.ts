import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CONFIG_SERVER_PORT, NODE_ENV } from './config/config.constants';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});
  app.enableCors();

  const logger = new Logger('Bootstrap');
  const configService = app.get(ConfigService);

  // Swagger
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Nest Starter Boilerplate')
    .setDescription('Nest collection of tools and authentication ready to use.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api', app, document);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  // Environments
  const port = configService.get<number>(CONFIG_SERVER_PORT);
  const environment = configService.get<string>(NODE_ENV);

  // app.use(compression());

  await app.listen(port);
  logger.log(
    `Application is running in ${environment.toUpperCase()} on: ${await app.getUrl()}`,
  );
}
bootstrap();
