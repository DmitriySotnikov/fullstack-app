import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsOptions, serverConfig } from './config/common.config';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors(corsOptions);
  app.setGlobalPrefix(serverConfig.PREFIX);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(serverConfig.PORT);
}

((): void => {
  bootstrap()
    .then(() =>
      process.stdout.write(`Auth service started ${serverConfig.PORT}...\n`),
    )
    .catch((err) => {
      process.stderr.write(`Error: ${err.message}\n`);
      process.exit(1);
    });
})();
