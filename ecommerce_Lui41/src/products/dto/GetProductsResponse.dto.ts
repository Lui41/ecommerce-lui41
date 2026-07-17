import { ApiProperty } from '@nestjs/swagger';

export class GetProductsResponseDto {
  @ApiProperty({
    description: 'Product UUID v4',
    example: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
  })
  id!: string;

  @ApiProperty({
    description: 'Product name',
    example: 'Wireless Mouse',
  })
  name!: string;

  @ApiProperty({
    description: 'Product description',
    example: 'Ergonomic wireless mouse for everyday use',
  })
  description!: string;

  @ApiProperty({
    description: 'Product price',
    example: 50.0,
  })
  price!: number;

  @ApiProperty({
    description: 'Available stock',
    example: 10,
  })
  stock!: number;

  @ApiProperty({
    description: 'Image URL',
    example: 'https://example.com/product-image.jpg',
  })
  imgUrl!: string;
}
