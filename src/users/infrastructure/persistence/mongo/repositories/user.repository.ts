import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/users/application/ports/user.repository';
import { User } from 'src/users/domain/user';
import { UserEntity } from '../entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserMapper } from '../mappers/user.mapper';
import { CreateUserCommand } from 'src/users/application/commands/create-user.command';

@Injectable()
export class MongoUserRepository implements UserRepository {
  constructor(
    @InjectModel(UserEntity.name) private readonly userModel: Model<UserEntity>,
  ) {}
  findOneBy(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async create(createUserCommand: CreateUserCommand): Promise<User> {
    const userModel = new this.userModel({
      email: createUserCommand.email,
      nickName: createUserCommand.nickName,
      displayName: createUserCommand.displayName,
      hash: createUserCommand.hash,
      salt: createUserCommand.salt,
    });
    const newEntity = await userModel.save();
    return UserMapper.toDomain(newEntity);
  }

  async findAll(): Promise<User[]> {
    const entities = await this.userModel.find().exec();
    return entities.map((entity) => UserMapper.toDomain(entity));
  }

  async findOneById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException();
    return UserMapper.toDomain(user);
  }
}
