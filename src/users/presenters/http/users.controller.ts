import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from 'src/users/application/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUserCommand } from 'src/users/application/commands/create-user.command';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/domain/user';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const createuserCommand = new CreateUserCommand(
      createUserDto.email,
      createUserDto.nickName,
      createUserDto.displayName,
    );
    return this.usersService.create(createuserCommand);
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
