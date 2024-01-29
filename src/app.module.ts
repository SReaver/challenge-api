import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import * as Joi from '@hapi/joi';
import { UsersModule } from './users/application/users.module';
import { ApplicationBootstrapOptions } from './common/interfaces/application-bootstrap-options.interface';
import { UsersInfrastructureModule } from './users/infrastructure/users-infrastructure.module';

const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),
});

@Module({
  imports: [
    CoreModule,
    ConfigModule.forRoot({
      expandVariables: true,
      validationSchema,
      envFilePath:
        process.env.NODE_ENV === 'production' ? '.env' : '.development.env',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  static register(options: ApplicationBootstrapOptions) {
    return {
      module: AppModule,
      imports: [
        CoreModule.forRoot(options),
        UsersModule.withInfrastructure(
          UsersInfrastructureModule.use(options.driver),
        ),
      ],
    };
  }
}
