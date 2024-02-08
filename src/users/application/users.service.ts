import { Injectable } from '@nestjs/common';
import { UserRepository } from './ports/user.repository';
import { CreateUserCommand } from './commands/create-user.command';
import { User } from '../domain/user';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  create(createUserCommand: CreateUserCommand): Promise<User> {
    return this.userRepository.create(createUserCommand);
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findOneById(userId: string) {
    return this.userRepository.findOneById(userId);
  }

  findOneBy(email: string) {
    return this.userRepository.findOneBy(email);
  }
}
