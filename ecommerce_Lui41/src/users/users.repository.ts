import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { GetUserByIdResponseDto } from './dto/GetUserByIdResponse.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersOrmRepository: Repository<User>,
  ) {}

  async getAllUsers(
    validPage: number,
    validLimit: number,
  ): Promise<Partial<User>[]> {
    const skip = (validPage - 1) * validLimit;
    const users: User[] = await this.usersOrmRepository.find({
      skip,
      take: validLimit,
    });

    return users;
  }

  async getUserById(id: string): Promise<GetUserByIdResponseDto> {
    const user = await this.usersOrmRepository.findOne({
      where: { id, isActive: true },
      relations: {
        orders: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con id: ${id} no encontrado`);
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      phone: user.phone,
      country: user.country,
      city: user.city,
      orders: user.orders.map((order) => ({
        id: order.id,
        date: order.date,
      })),
    };
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.usersOrmRepository.findOne({
      where: { email },
    });
    return user;
  }

  async createUser(userData: CreateUserDto): Promise<Partial<User>> {
    const newUser = this.usersOrmRepository.create(userData);
    const savedUser = await this.usersOrmRepository.save(newUser);
    return {
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
      address: savedUser.address,
      phone: savedUser.phone,
      country: savedUser.country,
      city: savedUser.city,
    };
  }

  async updateUser(id: string, userData: UpdateUserDto): Promise<string> {
    const user = await this.usersOrmRepository.findOne({
      where: { id, isActive: true },
    });
    if (!user) {
      throw new NotFoundException(`Usuario con id: ${id} no encontrado`);
    }
    await this.usersOrmRepository.update(id, userData);
    return id;
  }

  async deleteUser(id: string): Promise<{ message: string }> {
    const user = await this.usersOrmRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`Usuario con id: ${id} no encontrado`);
    }
    if (!user.isActive) {
      throw new BadRequestException('El usuario ya está desactivado');
    }

    user.isActive = false;

    await this.usersOrmRepository.save(user);

    return { message: `Usuario con id: ${id} desactivado correctamente` };
  }
}
