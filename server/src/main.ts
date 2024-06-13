import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';

import { LoggingInterceptor } from './common/interceptors/logger.interceptor';
import { LoggerService } from './common/logger/logger.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});
  app.set('trust proxy', 1);
  app.enableCors({
    origin: [process.env.ORIGIN, 'http://localhost:3000'],
    credentials: true,
  });

  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  await app.listen(process.env.PORT);
}
bootstrap();
