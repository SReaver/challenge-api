import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/iam/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signIn() {}

  @Post()
  signUp(@Body() createUser: CreateUserDto) {
    return this.authService.signUp(createUser);
  }

  @Post()
  refresh() {}
}
