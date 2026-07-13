import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'La dirección debe ser un texto' })
  @Length(3, 80, {
    message: 'La dirección debe tener entre 3 y 80 caracteres',
  })
  @ApiProperty({
    description: 'La dirección debe tener entre 3 y 80 caracteres',
    example: 'TestAddress 123',
  })
  address!: string;

  @IsOptional()
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

  @IsOptional()
  @IsString({ message: 'El país debe ser un texto' })
  @Length(5, 20, {
    message: 'El país debe tener entre 5 y 20 caracteres',
  })
  @ApiProperty({
    description: 'El país debe tener entre 5 y 20 caracteres',
    example: 'TestCountry',
  })
  country!: string;

  @IsOptional()
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
