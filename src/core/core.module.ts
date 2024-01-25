import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationBootstrapOptions } from 'src/common/interfaces/application-bootstrap-options.interface';

@Module({})
export class CoreModule {
  static forRoot(options: ApplicationBootstrapOptions) {
    const imports =
      options.driver === 'mongo'
        ? [MongooseModule.forRoot(process.env.MONGO_URI)]
        : [];

    return {
      module: CoreModule,
      imports,
    };
  }
}
