import { ApiProperty } from '@nestjs/swagger';

export class UserOrderDto {
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
}

export class GetUserByIdResponseDto {
  @ApiProperty({
    description: 'User UUID v4',
    example: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
  })
  id!: string;

  @ApiProperty({
    description: 'Full name',
    example: 'Test User',
  })
  name!: string;

  @ApiProperty({
    description: 'Email address',
    example: 'test01@mail.com',
  })
  email!: string;

  @ApiProperty({
    description: 'Physical address',
    example: 'Test Address 123',
  })
  address!: string;

  @ApiProperty({
    description: 'Phone number',
    example: 3624123456,
  })
  phone!: number;

  @ApiProperty({
    description: 'Country',
    example: 'Argentina',
  })
  country!: string;

  @ApiProperty({
    description: 'City',
    example: 'Buenos Aires',
  })
  city!: string;

  @ApiProperty({
    description: 'Orders associated with the user',
    type: () => [UserOrderDto],
  })
  orders!: UserOrderDto[];
}
