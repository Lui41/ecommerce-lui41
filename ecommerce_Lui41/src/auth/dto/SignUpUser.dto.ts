import { ApiProperty, PickType } from '@nestjs/swagger';
import { CreateUserDto } from '../../users/dto/CreateUser.dto';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class SignUpUserDto extends PickType(CreateUserDto, [
  'name',
  'email',
  'password',
  'address',
  'phone',
  'country',
  'city',
] as const) {
  @IsNotEmpty({ message: 'El campo confirmar contrasena es obligatorio' })
  @IsString({ message: 'El campo confirmar contrasena debe ser un texto' })
  @Length(8, 15, {
    message:
      'El campo confirmar contrasena debe tener entre 8 y 15 caracteres',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
    message:
      'El campo confirmar contrasena debe tener al menos una minuscula, una mayuscula, un numero y un caracter especial (!@#$%^&*)',
  })
  @ApiProperty({
    description: 'Must match the password field',
    example: 'Test123!',
  })
  confirmPassword!: string;
}
