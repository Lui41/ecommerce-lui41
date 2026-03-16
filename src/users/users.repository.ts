import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users) private ormUsersRepository: Repository<Users>,
  ) {}

  async getAllUsers(
    page: number,
    limit: number,
  ): Promise<Omit<Users, 'password'>[]> {
    const skip = (page - 1) * limit;

    const allUsers = await this.ormUsersRepository.find({
      skip: skip, // Salta los registros anteriores
      take: limit, // Limita la cantidad de registros devueltos
    });

    return allUsers.map(({ password, ...UserNoPassword }) => UserNoPassword);
  }

  async getUserById(id: string): Promise<Omit<Users, 'password'> | string> {
    const foundUser = await this.ormUsersRepository.findOne({
      where: { id },
      relations: {
        orders: {
          orderDetails: {
            products: true,
          },
        },
      },
    });

    if (!foundUser) return `No se encontró el usuario con id ${id}`;
    const { password, ...UserNoPassword } = foundUser;
    return UserNoPassword;
  }

  //! IMPORTANTE: Retorna un "Usuario" o "null" => Invocado por Auth
  async getUserByEmail(email: string): Promise<Users | null> {
    return await this.ormUsersRepository.findOneBy({ email: email });
  }

  async addUser(newUserData: Users): Promise<string> {
    const savedUser = await this.ormUsersRepository.save(newUserData);
    return savedUser.id;
  }

  async updateUser(
    id: string,
    newUserData: Users,
  ): Promise<Omit<Users, 'password'> | string> {
    const user = await this.ormUsersRepository.findOneBy({ id });
    if (!user) return `No existe usuario con id ${id}`;

    const mergedUser = this.ormUsersRepository.merge(user, newUserData);
    const savedUser = await this.ormUsersRepository.save(mergedUser);

    const { password, ...userNoPassword } = savedUser;
    return userNoPassword;
  }

  //! COMENTAR MAS ADELANTE !!!!!
  async deleteUser(id: string) {
    const foundUser = await this.ormUsersRepository.findOneBy({ id });
    if (!foundUser) throw new Error(`No existe usuario con id ${id}`);

    this.ormUsersRepository.remove(foundUser);
    return foundUser.id;
  }
}