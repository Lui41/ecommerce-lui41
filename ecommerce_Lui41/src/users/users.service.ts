import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
// import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { User } from './entities/user.entity';
import { GetUserByIdResponseDto } from './dto/GetUserByIdResponse.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUsers(validPage: number, validLimit: number): Promise<Partial<User>[]> {
    return this.usersRepository.getAllUsers(validPage, validLimit);
  }

  getUserById(id: string): Promise<GetUserByIdResponseDto> {
    return this.usersRepository.getUserById(id);
  }

  updateUser(id: string, userData: UpdateUserDto): Promise<string> {
    return this.usersRepository.updateUser(id, userData);
  }

  deleteUser(id: string): Promise<{ message: string }> {
    return this.usersRepository.deleteUser(id);
  }
}
