import { Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { NodeHashingService } from './hashing/node-hashing.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/application/users.module';

@Module({
  imports: [UsersModule],
  providers: [
    {
      provide: HashingService,
      useClass: NodeHashingService,
    },
    AuthService,
  ],
  controllers: [AuthController],
  exports: [HashingService],
})
export class IamModule {}
