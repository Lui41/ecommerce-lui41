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
    description: 'Product name with at least 3 characters',
    example: 'Wireless Mouse',
  })
  name!: string;

  @IsNotEmpty({ message: 'La descripcion del producto es obligatoria' })
  @IsString({ message: 'La descripcion debe ser un texto' })
  @ApiProperty({
    description: 'Product description with at least 20 characters',
    example: 'Ergonomic wireless mouse for everyday use',
  })
  description!: string;

  @IsNotEmpty({ message: 'El precio es obligatorio' })
  @Type(() => Number)
  @IsNumber({}, { message: 'El precio debe ser un numero' })
  @Min(0, { message: 'El precio no puede ser negativo' })
  @ApiProperty({
    description: 'Positive decimal price',
    example: 50.0,
  })
  price!: number;

  @IsNotEmpty({ message: 'El stock es obligatorio' })
  @Type(() => Number)
  @IsInt({ message: 'El stock debe ser un numero entero' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  @ApiProperty({
    description: 'Positive integer stock quantity',
    example: 10,
  })
  stock!: number;

  @IsOptional()
  @IsString({ message: 'La URL de la imagen debe ser texto' })
  @ApiProperty({
    description: 'Optional image URL ending in jpg, jpeg, png or webp',
    example: 'https://example.com/product-image.jpg',
    required: false,
  })
  imgUrl?: string;

  @IsNotEmpty({ message: 'La categoria es obligatoria' })
  @IsUUID('4', { message: 'El id de la categoria debe ser un UUID valido' })
  @ApiProperty({
    description: 'Category UUID v4',
    example: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
  })
  categoryId!: string;
}
