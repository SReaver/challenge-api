import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from 'src/users/application/ports/user.repository';
import { UserEntity, UserSchema } from './entities/user.entity';
import { MongoUserRepository } from './repositories/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
  ],
  providers: [
    {
      provide: UserRepository,
      useClass: MongoUserRepository,
    },
  ],
  exports: [UserRepository],
})
export class MongoPersistenceModule {}
