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
    description: 'Full name with 3 to 80 characters',
    example: 'Test User',
  })
  name!: string;

  @IsNotEmpty({ message: 'El email es obligatorio' })
  @IsString({ message: 'El email debe ser un texto' })
  @IsEmail({}, { message: 'El email debe tener un formato valido' })
  @ApiProperty({
    description: 'Valid email address',
    example: 'test01@mail.com',
  })
  email!: string;

  @IsNotEmpty({ message: 'La contrasena es obligatoria' })
  @IsString({ message: 'La contrasena debe ser un texto' })
  @Length(8, 15, {
    message: 'La contrasena debe tener entre 8 y 15 caracteres',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
    message:
      'La contrasena debe tener al menos una minuscula, una mayuscula, un numero y un caracter especial (!@#$%^&*)',
  })
  @ApiProperty({
    description:
      'Password with 8 to 15 characters, including lowercase, uppercase, number and special character',
    example: 'Test123!',
  })
  password!: string;

  @IsNotEmpty({ message: 'La direccion es obligatoria' })
  @IsString({ message: 'La direccion debe ser un texto' })
  @Length(3, 80, {
    message: 'La direccion debe tener entre 3 y 80 caracteres',
  })
  @ApiProperty({
    description: 'Address with 3 to 80 characters',
    example: 'Test Address 123',
  })
  address!: string;

  @IsNotEmpty({ message: 'El telefono es obligatorio' })
  @Type(() => Number)
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'El telefono debe ser un numero' },
  )
  @ApiProperty({
    description: 'Phone number with at least 10 digits',
    example: 3624123456,
  })
  phone!: number;

  @IsNotEmpty({ message: 'El pais es obligatorio' })
  @IsString({ message: 'El pais debe ser un texto' })
  @Length(5, 20, {
    message: 'El pais debe tener entre 5 y 20 caracteres',
  })
  @ApiProperty({
    description: 'Country with 5 to 20 characters',
    example: 'Argentina',
  })
  country!: string;

  @IsNotEmpty({ message: 'La ciudad es obligatoria' })
  @IsString({ message: 'La ciudad debe ser un texto' })
  @Length(5, 20, {
    message: 'La ciudad debe tener entre 5 y 20 caracteres',
  })
  @ApiProperty({
    description: 'City with 5 to 20 characters',
    example: 'Buenos Aires',
  })
  city!: string;
}
