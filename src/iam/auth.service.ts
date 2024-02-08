import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/application/users.service';
import { HashingService } from './hashing/hashing.service';
import { CreateUserDto } from 'src/iam/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashingService: HashingService,
  ) {}
  async signUp(createUserDto: CreateUserDto) {
    const foundUser = await this.usersService.findOneBy(createUserDto.email);
    if (foundUser) throw new ConflictException();
    const { hash, salt } = await this.hashingService.hash(
      createUserDto.password,
    );
    return this.usersService.create({
      nickName: createUserDto.nickName,
      displayName: createUserDto.displayName,
      email: createUserDto.email,
      hash,
      salt,
    });
  }
}
