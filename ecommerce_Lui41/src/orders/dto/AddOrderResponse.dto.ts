import { ApiProperty } from '@nestjs/swagger';

export class AddOrderUserDto {
  @ApiProperty({
    description: 'User UUID v4',
    example: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
  })
  id!: string;

  @ApiProperty({
    description: 'User full name',
    example: 'Test User',
  })
  name!: string;
}

export class AddOrderDetailDto {
  @ApiProperty({
    description: 'Order detail UUID v4',
    example: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
  })
  id!: string;

  @ApiProperty({
    description: 'Order total price',
    example: 150.0,
  })
  price!: number;
}

export class AddOrderResponseDto {
  @ApiProperty({
    description: 'Order UUID v4',
    example: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
  })
  id!: string;

  @ApiProperty({
    description: 'Order date in ISO format',
    example: '2026-07-17',
  })
  date!: Date;

  @ApiProperty({
    description: 'Order owner',
    type: () => AddOrderUserDto,
  })
  user!: AddOrderUserDto;

  @ApiProperty({
    description: 'Order details summary',
    type: () => AddOrderDetailDto,
  })
  orderDetail!: AddOrderDetailDto;
}
