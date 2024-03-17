import { DynamicModule, Logger, Module, Type } from '@nestjs/common';
import { UsersController } from '../presenters/http/users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, Logger],
})
export class UsersModule {
  static withInfrastructure(infrastructuremodule: Type | DynamicModule) {
    return {
      module: UsersModule,
      imports: [infrastructuremodule],
    };
  }
}
