import { NestFactory } from '@nestjs/core';
import * as cookieParser from "cookie-parser";
import { VersioningType } from "@nestjs/common";
import * as compression from "compression";
import helmet from "helmet";

import { AppModule } from './app.module';
import { Logger } from './shared/services/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true // false: framework will use default logger, true: will use custom logger for appstart logs too.
  });

  const logger = new Logger();
  logger.mainContext = "NestAppStart";
  app.useLogger(logger);
  app.enableVersioning({
    type: VersioningType.URI
  });
  app.enableCors();
  app.use(cookieParser());
  app.use(compression());
  app.use(helmet())
  app.setGlobalPrefix('api');

  process.on('unhandledRejection', (error: Error) => {
    logger.error(error, error.stack, 'unhandledRejection');
  });

  await app.listen(3000);
  logger.log(`App is running on: ${await app.getUrl()}`, 'bootstrap');
}
bootstrap();
