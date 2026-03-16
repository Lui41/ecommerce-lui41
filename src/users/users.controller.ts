import { Body, Controller, Delete, Get, Param, Put, Query, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { Users } from './entities/users.entity';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateUserDto } from './dto/createUser.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('users')
@Controller("users")
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  async getAllUsers(
    @Query("page") page?: string,
    @Query("limit") limit?: string
  ): Promise<Omit<Users, "password">[]> {

    const pageNum = Number(page);
    const limitNum = Number(limit);

    const validPage = !isNaN(pageNum) && pageNum > 0 ? pageNum : 1;
    const validLimit = !isNaN(limitNum) && limitNum > 0 ? limitNum : 1;

    return this.userService.getAllUsers(validPage, validLimit);
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  getUserById(@Param("id") id: string) {
    return this.userService.getUserById(id);
  }

  @Put(":id")
  @UseGuards(AuthGuard)
  updateUser(
    @Param("id") id: string,
    @Body() userNewData: CreateUserDto
  ) {
    return this.userService.updateUser(id, userNewData);
  }

  @Delete(":id")
  @UseGuards(AuthGuard)
  deleteUser(@Param("id") id: string) {
    return this.userService.deleteUser(id);
  }
}
