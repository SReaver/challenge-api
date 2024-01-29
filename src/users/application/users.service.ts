import { Injectable } from '@nestjs/common';
import { UserRepository } from './ports/user.repository';
import { CreateUserCommand } from './commands/create-user.command';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  create(createUserCommand: CreateUserCommand) {
    return this.userRepository.create(createUserCommand);
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findOne(userId: string) {
    return this.userRepository.findOne(userId);
  }
}
