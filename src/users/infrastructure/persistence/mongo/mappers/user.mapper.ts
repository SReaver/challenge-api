import { User } from 'src/users/domain/user';
import { UserEntity } from '../entities/user.entity';
import { Model } from 'mongoose';

export class UserMapper {
  static toDomain(userEntity: UserEntity): User {
    const user = new User(
      userEntity._id.toString(),
      userEntity.nickName,
      userEntity.displayName,
      userEntity.email,
    );
    return user;
  }

  static toPersistence(
    user: Omit<User, 'id'>,
    userModel: Model<User>,
  ): UserEntity {
    const entity = new userModel();
    entity.email = user.email;
    entity.displayName = user.displayName;
    entity.nickName = user.nickName;
    return entity;
  }
}
