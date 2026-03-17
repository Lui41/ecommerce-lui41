import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { SignupUserDto } from './dto/signupUser.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @ApiOperation({ summary: 'Verificar estado del servicio de autenticación' })
  checkAuth() {
    return this.authService.checkAuth();
  }

  @Post('login')
  @ApiOperation({ summary: 'Login de usuario (retorna JWT)' })
  @ApiResponse({ status: 200, description: 'Login exitoso' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  signIn(@Body() loginUserDto: LoginUserDto) {
    return this.authService.signIn(loginUserDto);
  }

  @Post('signup')
  @ApiOperation({ summary: 'Registro de usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado' })
  @ApiResponse({ status: 400, description: 'Error en datos' })
  signUp(@Body() signupUserDto: SignupUserDto) {
    return this.authService.signUp(signupUserDto);
  }
}