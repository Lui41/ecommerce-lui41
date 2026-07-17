import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'La direccion debe ser un texto' })
  @Length(3, 80, {
    message: 'La direccion debe tener entre 3 y 80 caracteres',
  })
  @ApiPropertyOptional({
    description: 'Address with 3 to 80 characters',
    example: 'Test Address 123',
  })
  address?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'El telefono debe ser un numero' },
  )
  @ApiPropertyOptional({
    description: 'Phone number with at least 10 digits',
    example: 3624123456,
  })
  phone?: number;

  @IsOptional()
  @IsString({ message: 'El pais debe ser un texto' })
  @Length(5, 20, {
    message: 'El pais debe tener entre 5 y 20 caracteres',
  })
  @ApiPropertyOptional({
    description: 'Country with 5 to 20 characters',
    example: 'Argentina',
  })
  country?: string;

  @IsOptional()
  @IsString({ message: 'La ciudad debe ser un texto' })
  @Length(5, 20, {
    message: 'La ciudad debe tener entre 5 y 20 caracteres',
  })
  @ApiPropertyOptional({
    description: 'City with 5 to 20 characters',
    example: 'Buenos Aires',
  })
  city?: string;
}
