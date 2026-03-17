import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Orders } from '../../orders/entities/orders.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'USERS' })
export class Users {

  @ApiProperty({
    description: 'Identificador único del usuario',
    example: 'b7c2d9a1-3c9c-4b52-9b7d-1f23a4567890'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nombre completo del usuario',
    example: 'Juan Pérez'
  })
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'juan@email.com'
  })
  @Column({ type: 'varchar', length: 50, unique: true })
  email: string;

  @ApiProperty({
    description: 'Contraseña encriptada',
    example: '$2b$10$hashSeguro'
  })
  @Column({ type: 'varchar', length: 100 })
  password: string;

  @ApiProperty({
    example: '+573001234567'
  })
  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @ApiProperty({ example: 'Colombia' })
  @Column({ type: 'varchar', length: 50 })
  country: string;

  @ApiProperty({ example: 'Calle 10 #20-30' })
  @Column({ type: 'text' })
  address: string;

  @ApiProperty({ example: 'Medellín' })
  @Column({ type: 'varchar', length: 50 })
  city: string;

  @ApiProperty({ example: false })
  @Column({ type: 'boolean', default: false })
  admin: boolean;

  @ApiProperty({
    description: 'Órdenes del usuario',
    type: () => [Orders]
  })
  @OneToMany(() => Orders, (order) => order.user)
  orders: Orders[];
}