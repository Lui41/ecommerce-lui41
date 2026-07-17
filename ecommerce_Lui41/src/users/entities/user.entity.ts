import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Order } from '../../orders/entities/orders.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'User UUID v4',
    example: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
  })
  id!: string;

  @Column({
    length: 80,
    nullable: false,
  })
  @ApiProperty({
    description: 'Full name',
    example: 'Test User',
  })
  name!: string;

  @Column({
    length: 50,
    nullable: false,
    unique: true,
  })
  @ApiProperty({
    description: 'Email address',
    example: 'test01@mail.com',
  })
  email!: string;

  @Column({
    length: 70,
    nullable: false,
  })
  @ApiHideProperty()
  password!: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  @ApiProperty({
    description: 'Phone number',
    example: '3624123456',
  })
  phone!: number;

  @Column({
    length: 20,
    nullable: false,
  })
  @ApiProperty({
    description: 'Country',
    example: 'Argentina',
  })
  country!: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  @ApiProperty({
    description: 'Address',
    example: 'Test Address 123',
  })
  address!: string;

  @Column({
    length: 20,
    nullable: false,
  })
  @ApiProperty({
    description: 'City',
    example: 'Buenos Aires',
  })
  city!: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  @ApiProperty({
    description: 'True when the user is an administrator',
  })
  isAdmin!: boolean;

  @Column({
    type: 'boolean',
    default: true,
  })
  @ApiProperty({
    description: 'True when the user account is active',
  })
  isActive!: boolean;

  @OneToMany(() => Order, (order) => order.user)
  @ApiProperty({
    description: 'Orders linked to the user',
    type: () => [Order],
  })
  orders!: Order[];
}
