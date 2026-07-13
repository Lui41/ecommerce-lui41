import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class ProductOrderDto {
  @IsNotEmpty({ message: 'El id del producto es obligatorio' })
  @IsUUID('4', { message: 'El id del producto debe ser un UUID válido' })
  @ApiProperty({
    description: 'El id debe ser de tipo UUID versión 4',
    example: '...',
  })
  id!: string;
}
