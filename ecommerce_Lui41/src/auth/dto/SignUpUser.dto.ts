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
]) {
  @IsNotEmpty({ message: 'El campo confirmar contraseña es obligatorio' })
  @IsString({ message: 'El campo confirmar contraseña debe ser un texto' })
  @Length(8, 15, {
    message: 'El campo confirmar contraseña debe tener entre 8 y 15 caracteres',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
    message:
      'El campo confirmar contraseña debe tener al menos una minúscula, una mayúscula, un número y un caracter especial (!@#$%^&*)',
  })
  @ApiProperty({
    description:
      'El campo confirmar contraseña debe coincidir con el campo de contraseña',
    example: 'Test123!',
  })
  confirmPassword!: string;
}
