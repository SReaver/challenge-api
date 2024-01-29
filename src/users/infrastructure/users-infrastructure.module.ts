import { Module } from '@nestjs/common';
import { MongoPersistenceModule } from './persistence/mongo/mongo-persistence.module';

@Module({})
export class UsersInfrastructureModule {
  static use(driver: 'orm' | 'mongo') {
    const persistenceModule =
      driver === 'mongo' ? MongoPersistenceModule : MongoPersistenceModule;

    return {
      module: UsersInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
