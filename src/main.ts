import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule, utilities } from 'nest-winston';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { transports, format } from 'winston';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const logger = WinstonModule.createLogger({
    transports: [
      new transports.Console({
        level: 'debug',
        format: format.combine(
          format.timestamp(),
          format.ms(),
          utilities.format.nestLike('Challenge', {
            colors: true,
            prettyPrint: true,
          }),
        ),
      }),
    ],
  });

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule.register({ driver: 'mongo' }),
    { logger },
  );

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new ResponseInterceptor());

  const options = new DocumentBuilder()
    .setTitle('Challenge-API')
    .setDescription('API for challenge application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}

bootstrap();
