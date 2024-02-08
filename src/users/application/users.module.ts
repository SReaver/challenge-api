import { DynamicModule, Module, Type } from '@nestjs/common';
import { UsersController } from '../presenters/http/users.controller';
import { UsersService } from './users.service';
import { UserRepository } from './ports/user.repository';
// import { MongoUserRepository } from '../infrastructure/persistence/mongo/repositories/user.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    // UserRepository,
    // MongoUserRepository,
    // { provide: UserRepository, useClass: MongoUserRepository },
  ],
  exports: [UsersService, UserRepository],
})
export class UsersModule {
  static withInfrastructure(infrastructuremodule: DynamicModule) {
    return {
      module: UsersModule,
      imports: [infrastructuremodule],
      exports: [infrastructuremodule],
    };
  }
}
