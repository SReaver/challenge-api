import { User } from 'src/users/domain/user';
import { UserEntity } from '../entities/user.entity';
import { Model, Types } from 'mongoose';
import { HashWithSalt } from 'src/iam/hashing/hash-with-salt.interface';

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
    user: User,
    userModel: Model<UserEntity>,
  ): Partial<UserEntity> {
    const entity = new userModel();
    entity.email = user.email;
    entity.displayName = user.displayName;
    entity.nickName = user.nickName;
    if (user.id) {
      entity._id = new Types.ObjectId(user.id);
    }

    return entity;
  }

  static toAuth(userEntity: UserEntity): HashWithSalt {
    return {
      hash: userEntity.hash,
      salt: userEntity.salt,
    };
  }
}
