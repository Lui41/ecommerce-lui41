import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
  @IsString({ message: 'El nombre debe ser un texto' })
  @ApiProperty({
    description: 'El nombre del producto debe tener al menos 3 caracteres',
    example: 'Producto Test',
  })
  name!: string;

  @IsNotEmpty({ message: 'La descripción del producto es obligatoria' })
  @IsString({ message: 'La descripción debe ser un texto' })
  @ApiProperty({
    description:
      'La descripción del producto debe tener al menos 20 caracteres',
    example: 'Descripción producto Test',
  })
  description!: string;

  @IsNotEmpty({ message: 'El precio es obligatorio' })
  @Type(() => Number)
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @Min(0, { message: 'El precio no puede ser negativo' })
  @ApiProperty({
    description: 'El precio debe ser un número positivo y decimal',
    example: '50.00',
  })
  price!: number;

  @IsNotEmpty({ message: 'El stock es obligatorio' })
  @Type(() => Number)
  @IsInt({ message: 'El stock debe ser un número entero' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  @ApiProperty({
    description: 'El stock debe ser un número entero y positivo',
    example: '10',
  })
  stock!: number;

  @IsOptional()
  @IsString({ message: 'La URL de la imágen debe ser texto' })
  @ApiProperty({
    description:
      'La imágen debe ser un formáto válido, que termine en .jpg/.jpeg/.png/.webp',
    example: 'http://......jpg',
  })
  imgUrl?: string;

  @IsNotEmpty({ message: 'La categoría es obligatoria' })
  @IsUUID('4', { message: 'El id de la categoría debe ser un UUID válido' })
  @ApiProperty({
    description: 'El id debe ser de tipo UUID versión 4',
    example: '...',
  })
  categoryId!: string;
}
