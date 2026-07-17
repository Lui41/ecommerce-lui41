import {
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/LoginUser.dto';
import { SignUpUserDto } from './dto/SignUpUser.dto';
import { CreateUserResponseDto } from '../users/dto/CreateUserResponse.dto';
import { AuthResponseDto } from './dto/AuthResponse.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({
    summary: 'Create a new user account',
    description: 'Registers a new user and returns the created profile.',
  })
  @ApiCreatedResponse({
    description: 'User created successfully',
    type: CreateUserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation error or duplicated user',
  })
  signUp(@Body() userData: SignUpUserDto): Promise<Partial<CreateUserResponseDto>> {
    return this.authService.signUp(userData);
  }

  @Post('signin')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Authenticate user',
    description: 'Validates credentials and returns a JWT access token.',
  })
  @ApiOkResponse({
    description: 'User authenticated successfully',
    type: AuthResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
  })
  signIn(
    @Body() credentials: LoginUserDto,
  ): Promise<AuthResponseDto> {
    const { email, password } = credentials;
    return this.authService.signIn(email, password);
  }
}
