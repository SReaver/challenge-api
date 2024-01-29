import { User } from 'src/users/domain/user';

export abstract class UserRepository {
  abstract findAll(): Promise<User[]>;
  abstract create(user: Omit<User, 'id'>): Promise<User>;
  abstract findOne(userId: string): Promise<User> | null;
}
