import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ProductOrderDto } from './ProductOrder.dto';

export class CreateOrderDto {
  @IsNotEmpty({ message: 'El userId es obligatorio' })
  @IsUUID('4', { message: 'El userId debe ser un UUID valido' })
  @ApiProperty({
    description: 'User UUID v4',
    example: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
  })
  userId!: string;

  @IsArray({ message: 'Productos debe ser un array' })
  @ArrayMinSize(1, { message: 'Debe haber al menos un producto' })
  @ValidateNested({ each: true })
  @Type(() => ProductOrderDto)
  @ApiProperty({
    description: 'Array of products that will be included in the order',
    type: () => [ProductOrderDto],
    example: [
      { id: '7c9e6679-7425-40de-944b-e07fc1f90ae7' },
      { id: 'd94f1f4e-1d5a-4f3f-bab5-3c8b65f3df02' },
    ],
  })
  products!: ProductOrderDto[];
}
