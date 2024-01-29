import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from 'src/users/application/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUserCommand } from 'src/users/application/commands/create-user.command';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(
      new CreateUserCommand(
        createUserDto.email,
        createUserDto.nickName,
        createUserDto.displayName,
      ),
    );
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
