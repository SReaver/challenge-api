import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from 'src/users/application/ports/user.repository';
import { User } from 'src/users/domain/user';
import { UserEntity } from '../entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class MongoUserRepository implements UserRepository {
  constructor(
    @InjectModel(UserEntity.name) private readonly userModel: Model<User>,
  ) {}

  async create(user: Omit<User, 'id'>): Promise<User> {
    const foundUser = await this.findOneByEmail(user.email);
    if (foundUser)
      throw new ConflictException(
        `User with email ${user.email} already exists`,
      );
    const persistenceModel = UserMapper.toPersistence(user, this.userModel);
    const newEntity = await persistenceModel.save();
    return UserMapper.toDomain(newEntity);
  }

  async findAll(): Promise<User[]> {
    const entities = await this.userModel.find().exec();
    return entities.map((entity) => UserMapper.toDomain(entity));
  }

  async findOne(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException();
    return UserMapper.toDomain(user);
  }

  findOneByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
}
