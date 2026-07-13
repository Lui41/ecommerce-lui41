import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import * as bcrypt from 'bcrypt';
import { SignUpUserDto } from './dto/SignUpUser.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from './enums/roles.enum';
import { CreateUserDto } from '../users/dto/CreateUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(userData: SignUpUserDto): Promise<Partial<CreateUserDto>> {
    const { email, password, confirmPassword, ...restUserData } = userData;
    const foundUser = await this.usersRepository.getUserByEmail(email);
    if (foundUser)
      throw new BadRequestException(
        'Ya existe un usuario creado con el mail ingresado',
      );

    if (password !== confirmPassword)
      throw new BadRequestException(
        'Los campos de contraseña y confirmar contraseña no coinciden',
      );

    const hashedPassword: string = await bcrypt.hash(password, 10);

    return await this.usersRepository.createUser({
      ...restUserData,
      email,
      password: hashedPassword,
    });
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ message: string; token: string }> {
    const foundUser = await this.usersRepository.getUserByEmail(email);

    if (!foundUser) {
      throw new UnauthorizedException('Correo o contraseña son incorrectos');
    }

    const validPassword = await bcrypt.compare(password, foundUser.password);
    if (!validPassword)
      throw new UnauthorizedException('Correo o contraseña son incorrectos');

    const payload = {
      id: foundUser.id,
      roles: foundUser.isAdmin ? [Role.Admin] : [Role.User],
    };
    const token = this.jwtService.sign(payload);

    return { message: 'Usuario logueado', token: token };
  }
}
