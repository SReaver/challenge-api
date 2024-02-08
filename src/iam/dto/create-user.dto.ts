import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  nickName: string;

  @IsString()
  @IsNotEmpty()
  displayName: string;

  @IsEmail()
  email: string;

  @MinLength(5)
  password: string;
}
