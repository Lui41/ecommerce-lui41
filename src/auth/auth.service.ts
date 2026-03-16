import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { LoginUserDto } from './dto/loginUser.dto';
import { SignupUserDto } from './dto/signupUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  checkAuth() {
    return { message: 'Auth endpoint working' };
  }

  async signIn(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.usersRepository.getUserByEmail(email);

    // error genérico
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // comparar contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // payload del token
const payload = {
  sub: user.id,
  email: user.email,
  admin: user.admin,
};

    // generar token
    const token = this.jwtService.sign(payload);

    return {
      message: 'Login exitoso',
      token,
    };
  }

  async signUp(signupUserDto: SignupUserDto) {
    const { password, confirmPassword, ...userData } = signupUserDto;

    if (password !== confirmPassword) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }

    const existingUser = await this.usersRepository.getUserByEmail(
      signupUserDto.email,
    );

    if (existingUser) {
      throw new BadRequestException('El usuario ya existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await this.usersRepository.addUser({
      ...userData,
      password: hashedPassword,
    } as any);

    const newUser = await this.usersRepository.getUserById(userId);

    return newUser;
  }
}