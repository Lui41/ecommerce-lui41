import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../../orders/entities/orders.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'UUID V4 generado por la BBDD',
  })
  id!: string;

  @Column({
    length: 80,
    nullable: false,
  })
  @ApiProperty({
    description:
      'Este campo debe incluir Nombre y Apellido, y tener tener entre 3 y 80 caracteres',
    example: 'Test 01',
  })
  name!: string;

  @Column({
    length: 50,
    nullable: false,
    unique: true,
  })
  @ApiProperty({
    description: 'El correo debe ser una dirección de correo válida',
    example: 'test01@mail.com',
  })
  email!: string;

  @Column({
    length: 70,
    nullable: false,
  })
  @ApiProperty({
    description:
      'La contraseña debe tener entre 8 y 15 caracteres, y contener al menos una minúscula, una mayúscula, un número y un caracter especial (!@#$%^&*)',
    example: 'Test123!',
  })
  password!: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  @ApiProperty({
    description:
      'El teléfono debe tener solo números y como mínimo 10 caracteres',
    example: '3624123456',
  })
  phone!: number;

  @Column({
    length: 20,
    nullable: false,
  })
  @ApiProperty({
    description: 'El país debe tener entre 5 y 20 caracteres',
    example: 'Test-Country',
  })
  country!: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  @ApiProperty({
    description: 'La dirección debe tener entre 3 y 80 caracteres',
    example: 'Test-Address',
  })
  address!: string;

  @Column({
    length: 20,
    nullable: false,
  })
  @ApiProperty({
    description: 'La ciudad debe tener entre 5 y 20 caracteres',
    example: 'Test-City',
  })
  city!: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  @ApiProperty({
    description: 'Define el rol del usuario, por defecto son todos "Users"',
  })
  isAdmin!: boolean;

  @Column({
    type: 'boolean',
    default: true,
  })
  @ApiProperty({
    description:
      'Define si es un usuario Activo o no, por defecto se inicia como "isActive = true"',
  })
  isActive!: boolean;

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];
}
