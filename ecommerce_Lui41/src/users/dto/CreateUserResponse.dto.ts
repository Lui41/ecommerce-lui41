import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './CreateUser.dto';

export class CreateUserResponseDto extends OmitType(CreateUserDto, [
  'password',
] as const) {}
