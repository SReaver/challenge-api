import { User } from 'src/users/domain/user';
import { CreateUserCommand } from '../commands/create-user.command';

export abstract class UserRepository {
  abstract findAll(): Promise<User[]>;
  abstract create(user: CreateUserCommand): Promise<User>;
  abstract findOneById(userId: string): Promise<User> | null;
  abstract findOneBy(email: string): Promise<User> | null;
  // abstract get;
}
