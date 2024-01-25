import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import * as Joi from '@hapi/joi';

const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),
});

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      validationSchema,
      envFilePath:
        process.env.NODE_ENV === 'production' ? '.env' : '.development.env',
    }),
    CoreModule.forRoot({ driver: 'mongo' }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
