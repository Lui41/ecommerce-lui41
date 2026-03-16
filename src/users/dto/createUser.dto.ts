import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
  IsNumber,
} from 'class-validator';

export class CreateUserDto {

    @ApiProperty()
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @Length(3, 80, { message: 'El nombre debe tener entre 3 y 80 caracteres' })
  name: string;


  @ApiProperty()
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  email: string;



  @ApiProperty()
  @IsString({ message: 'La contraseña debe ser un texto' })
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  @Length(8, 15, { message: 'La contraseña debe tener entre 8 y 15 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
    message:
      'La contraseña debe tener al menos una mayúscula, una minúscula, un número y un carácter especial',
  })
  password: string;


  @ApiProperty()
  @IsString({ message: 'Debe confirmar la contraseña' })
  @IsNotEmpty({ message: 'La confirmación de contraseña es obligatoria' })
  confirmPassword: string;


  @ApiProperty()
  @IsString({ message: 'La dirección debe ser un texto' })
  @IsNotEmpty({ message: 'La dirección no puede estar vacía' })
  @Length(3, 80, { message: 'La dirección debe tener entre 3 y 80 caracteres' })
  address: string;


  @ApiProperty()
  @IsNumber({}, { message: 'El teléfono debe ser numérico' })
  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  phone: number;



  @ApiProperty()
  @IsString({ message: 'El país debe ser un texto' })
  @IsNotEmpty({ message: 'El país no puede estar vacío' })
  @Length(5, 20, { message: 'El país debe tener entre 5 y 20 caracteres' })
  country: string;



  @ApiProperty()
  @IsString({ message: 'La ciudad debe ser un texto' })
  @Length(5, 20, { message: 'La ciudad debe tener entre 5 y 20 caracteres' })
  city: string;
}
