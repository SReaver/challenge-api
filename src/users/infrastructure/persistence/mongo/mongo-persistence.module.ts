import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from 'src/users/application/ports/user.repository';
import { UserEntity, UserSchema } from './entities/user.entity';
import { MongoUserRepository } from './repositories/user.repository';
import { UsersService } from 'src/users/application/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
  ],
  providers: [
    UsersService,
    {
      provide: UserRepository,
      useClass: MongoUserRepository,
    },
  ],
  exports: [
    {
      provide: UserRepository,
      useClass: MongoUserRepository,
    },
    // UserRepository,
    // MongoUserRepository,
    UsersService,
  ],
})
export class MongoPersistenceModule {}
