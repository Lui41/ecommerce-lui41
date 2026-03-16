import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
} from 'class-validator';
import { Products } from 'src/products/entities/products.entity';

export class CreateOrderDto {

  @ApiProperty()
  @IsNotEmpty({ message: 'El userId es obligatorio' })
  @IsUUID('4', { message: 'El userId debe ser un UUID válido' })
  userId: string;


  @ApiProperty()
  @IsNotEmpty({ message: 'La lista de productos es obligatoria' })
  @IsArray({ message: 'Products debe ser un arreglo de productos' })
  @ArrayMinSize(1, { message: 'La orden debe tener al menos un producto' })
  products: Partial<Products>[];

}