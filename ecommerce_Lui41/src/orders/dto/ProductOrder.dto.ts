import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class ProductOrderDto {
  @IsNotEmpty({ message: 'El id del producto es obligatorio' })
  @IsUUID('4', { message: 'El id del producto debe ser un UUID valido' })
  @ApiProperty({
    description: 'Product UUID v4',
    example: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
  })
  id!: string;
}
