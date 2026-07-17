import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsNumber({}, { message: 'El precio debe ser un numero' })
  @Type(() => Number)
  @Min(0, { message: 'El precio no puede ser negativo' })
  @ApiPropertyOptional({
    description: 'Positive decimal price',
    example: 100.0,
  })
  price?: number;

  @IsOptional()
  @IsInt({ message: 'El stock debe ser un numero' })
  @Type(() => Number)
  @Min(0, { message: 'El stock no puede ser negativo' })
  @ApiPropertyOptional({
    description: 'Positive integer stock quantity',
    example: 20,
  })
  stock?: number;

  @IsOptional()
  @IsString({ message: 'La URL de la imagen debe ser texto' })
  @ApiPropertyOptional({
    description: 'Optional image URL ending in jpg, jpeg, png or webp',
    example: 'https://example.com/product-image.jpg',
  })
  imgUrl?: string;

  @IsOptional()
  @IsUUID('4', { message: 'El id de la categoria debe ser un UUID valido' })
  @ApiPropertyOptional({
    description: 'Category UUID v4',
    example: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
  })
  categoryId?: string;
}
