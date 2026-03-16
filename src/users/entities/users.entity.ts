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
    example: 'Juan Pérez',
    maxLength: 50
  })
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'juan@email.com',
    maxLength: 50
  })
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario (almacenada como hash)',
    example: '$2b$10$hashDeEjemploSeguro',
    maxLength: 100
  })
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  password: string;

  @ApiProperty({
    description: 'Número de teléfono del usuario',
    example: '+573001234567'
  })
  @Column({
    type: 'varchar',
    length: 20,
  })
  phone: string;

  @ApiProperty({
    description: 'País de residencia del usuario',
    example: 'Colombia'
  })
  @Column({
    type: 'varchar',
    length: 50,
  })
  country: string;

  @ApiProperty({
    description: 'Dirección de residencia del usuario',
    example: 'Calle 10 #20-30'
  })
  @Column({
    type: 'text',
  })
  address: string;

  @ApiProperty({
    description: 'Ciudad de residencia del usuario',
    example: 'Medellín'
  })
  @Column({
    type: 'varchar',
    length: 50,
  })
  city: string;

  @ApiProperty({
    description: 'Indica si el usuario tiene permisos de administrador',
    example: false,
    default: false
  })
  @Column({
    type: 'boolean',
    default: false,
  })
  admin: boolean;

  @ApiProperty({
    description: 'Lista de órdenes realizadas por el usuario',
    type: () => [Orders]
  })
  @OneToMany(() => Orders, (order) => order.user)
  orders: Orders[];
}