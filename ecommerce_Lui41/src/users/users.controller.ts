import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  // Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guards/auth.guard';
// import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../auth/enums/roles.enum';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { GetUserByIdResponseDto } from './dto/GetUserByIdResponse.dto';
import { ExcludePasswordInterceptor } from '../interceptors/ExcludePassword.interceptor';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiBearerAuth()
  @ApiQuery({
    name: 'page',
    required: false,
    type: String,
    description: 'Número de página',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: String,
    description: 'Cantidad de registros por página',
  })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(ExcludePasswordInterceptor)
  getUsers(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<Partial<User>[]> {
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const validPage = !isNaN(pageNumber) && pageNumber > 0 ? pageNumber : 1;
    const validLimit = !isNaN(limitNumber) && limitNumber > 0 ? limitNumber : 5;

    return this.usersService.getUsers(validPage, validLimit);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  getUserById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<GetUserByIdResponseDto> {
    return this.usersService.getUserById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() userData: UpdateUserDto,
  ): Promise<string> {
    return this.usersService.updateUser(id, userData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  deleteUser(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<{ message: string }> {
    return this.usersService.deleteUser(id);
  }
}
