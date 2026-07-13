import { ApiProperty } from '@nestjs/swagger';
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
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @Type(() => Number)
  @Min(0, { message: 'El precio no puede ser negativo' })
  @ApiProperty({
    description: 'El precio debe ser un número positivo y decimal',
    example: '100.00',
  })
  price?: number;

  @IsOptional()
  @IsInt({ message: 'El stock debe ser un número' })
  @Type(() => Number)
  @Min(0, { message: 'El stock no puede ser negativo' })
  @ApiProperty({
    description: 'El stock debe ser un número entero y positivo',
    example: '20',
  })
  stock?: number;

  @IsOptional()
  @IsString({ message: 'La URL de la imagen debe ser texto' })
  @ApiProperty({
    description:
      'La imágen debe ser un formáto válido, que termine en .jpg/.jpeg/.png/.webp',
    example: 'http://......jpg',
  })
  imgUrl?: string;

  @IsOptional()
  @IsUUID('4', { message: 'El id de la categoría debe ser un UUID válido' })
  @ApiProperty({
    description: 'El id debe ser de tipo UUID versión 4',
    example: '...',
  })
  categoryId?: string;
}
