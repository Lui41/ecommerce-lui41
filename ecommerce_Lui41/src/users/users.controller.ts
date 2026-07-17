import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../auth/enums/roles.enum';
import { User } from './entities/user.entity';
import { GetUserByIdResponseDto } from './dto/GetUserByIdResponse.dto';
import { ExcludePasswordInterceptor } from '../interceptors/ExcludePassword.interceptor';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'List users',
    description: 'Returns paginated active users. Admin only.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Records per page',
    example: 5,
  })
  @ApiOkResponse({
    description: 'Users list',
    type: User,
    isArray: true,
  })
  @ApiForbiddenResponse({
    description: 'Admin role required',
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
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Get user by id',
    description: 'Returns a user with its orders.',
  })
  @ApiOkResponse({
    description: 'User found',
    type: GetUserByIdResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid UUID',
  })
  @UseGuards(AuthGuard)
  getUserById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<GetUserByIdResponseDto> {
    return this.usersService.getUserById(id);
  }

  @Put(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Update user',
    description: 'Updates address, phone, country or city for a user.',
  })
  @ApiOkResponse({
    description: 'User updated successfully',
  })
  @UseGuards(AuthGuard)
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() userData: UpdateUserDto,
  ): Promise<string> {
    return this.usersService.updateUser(id, userData);
  }

  @Delete(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Delete user',
    description: 'Soft deletes the user by marking it inactive.',
  })
  @ApiOkResponse({
    description: 'User deleted successfully',
  })
  @UseGuards(AuthGuard)
  deleteUser(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<{ message: string }> {
    return this.usersService.deleteUser(id);
  }
}
