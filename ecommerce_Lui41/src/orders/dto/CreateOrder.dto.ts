import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ProductOrderDto } from './ProductOrder.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsNotEmpty({ message: 'El userId es obligatorio' })
  @IsUUID('4', { message: 'El userId debe ser un UUID válido' })
  @ApiProperty({
    description: 'El id debe ser de tipo UUID versión 4',
    example: '...',
  })
  userId!: string;

  @IsArray({ message: 'Productos debe ser un array' })
  @ArrayMinSize(1, { message: 'Debe haber al menos un producto' })
  @ValidateNested({ each: true })
  @Type(() => ProductOrderDto)
  @ApiProperty({
    description: 'Debe ser un array de ids de productos',
    example: '[{"id": "..."}, {"id": "..."}]',
  })
  products!: ProductOrderDto[];
}
