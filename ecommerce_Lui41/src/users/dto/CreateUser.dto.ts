import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser un texto' })
  @Length(3, 80, {
    message: 'El nombre debe tener entre 3 y 80 caracteres',
  })
  @ApiProperty({
    description:
      'Este campo debe incluir Nombre y Apellido, y tener tener entre 3 y 80 caracteres',
    example: 'Test 01',
  })
  name!: string;

  @IsNotEmpty({ message: 'El email es obligatorio' })
  @IsString({ message: 'El email debe ser un texto' })
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  @ApiProperty({
    description: 'El correo debe ser una dirección de correo válida',
    example: 'test01@mail.com',
  })
  email!: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @IsString({ message: 'La contraseña debe ser un texto' })
  @Length(8, 15, {
    message: 'La contraseña debe tener entre 8 y 15 caracteres',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
    message:
      'La contraseña debe tener al menos una minúscula, una mayúscula, un número y un caracter especial (!@#$%^&*)',
  })
  @ApiProperty({
    description:
      'La contraseña debe tener entre 8 y 15 caracteres, y contener al menos una minúscula, una mayúscula, un número y un caracter especial (!@#$%^&*)',
    example: 'Test123!',
  })
  password!: string;

  @IsNotEmpty({ message: 'La dirección es obligatoria' })
  @IsString({ message: 'La dirección debe ser un texto' })
  @Length(3, 80, {
    message: 'La dirección debe tener entre 3 y 80 caracteres',
  })
  @ApiProperty({
    description: 'La dirección debe tener entre 3 y 80 caracteres',
    example: 'TestAddress 123',
  })
  address!: string;

  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  @Type(() => Number)
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'El teléfono debe ser un número' },
  )
  @ApiProperty({
    description:
      'El teléfono debe tener solo números y como mínimo 10 caracteres',
    example: '3624123456',
  })
  phone!: number;

  @IsNotEmpty({ message: 'El país es obligatorio' })
  @IsString({ message: 'El país debe ser un texto' })
  @Length(5, 20, {
    message: 'El país debe tener entre 5 y 20 caracteres',
  })
  @ApiProperty({
    description: 'El país debe tener entre 5 y 20 caracteres',
    example: 'TestCountry',
  })
  country!: string;

  @IsNotEmpty({ message: 'La ciudad es obligatoria' })
  @IsString({ message: 'La ciudad debe ser un texto' })
  @Length(5, 20, {
    message: 'La ciudad debe tener entre 5 y 20 caracteres',
  })
  @ApiProperty({
    description: 'La ciudad debe tener entre 5 y 20 caracteres',
    example: 'TestCity',
  })
  city!: string;
}
