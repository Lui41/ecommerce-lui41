import { Body, Controller, Delete, Get, Param, Put, Query, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { Users } from './entities/users.entity';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateUserDto } from './dto/createUser.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam
} from '@nestjs/swagger';

@ApiBearerAuth('jwt')
@ApiTags('Users')
@Controller("users")
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Listar usuarios (solo admin)' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiResponse({ status: 200, description: 'Lista de usuarios' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  async getAllUsers(
    @Query("page") page?: string,
    @Query("limit") limit?: string
  ): Promise<Omit<Users, "password">[]> {

    const pageNum = Number(page);
    const limitNum = Number(limit);

    const validPage = !isNaN(pageNum) && pageNum > 0 ? pageNum : 1;
    const validLimit = !isNaN(limitNum) && limitNum > 0 ? limitNum : 10;

    return this.userService.getAllUsers(validPage, validLimit);
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Obtener usuario por ID' })
  @ApiParam({ name: 'id', example: 'uuid-del-usuario' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  getUserById(@Param("id") id: string) {
    return this.userService.getUserById(id);
  }

  @Put(":id")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Actualizar usuario' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado' })
  updateUser(
    @Param("id") id: string,
    @Body() userNewData: CreateUserDto
  ) {
    return this.userService.updateUser(id, userNewData);
  }

  @Delete(":id")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Eliminar usuario' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado' })
  deleteUser(@Param("id") id: string) {
    return this.userService.deleteUser(id);
  }
}