import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/LoginUser.dto';
import { SignUpUserDto } from './dto/SignUpUser.dto';
import { CreateUserDto } from '../users/dto/CreateUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() userData: SignUpUserDto): Promise<Partial<CreateUserDto>> {
    return this.authService.signUp(userData);
  }

  @Post('signin')
  @HttpCode(200)
  signIn(
    @Body() credentials: LoginUserDto,
  ): Promise<{ message: string; token: string }> {
    const { email, password } = credentials;
    return this.authService.signIn(email, password);
  }
}
