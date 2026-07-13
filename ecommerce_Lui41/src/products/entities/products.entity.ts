import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../categories/entities/categories.entity';
import { OrderDetail } from '../../orderDetails/entities/orderDetails.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'products',
})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'UUID V4 generado por la BBDD',
  })
  id!: string;

  @Column({
    length: 50,
    nullable: false,
  })
  @ApiProperty({
    description: 'El nombre puede tener hasta 50 caracteres',
  })
  name!: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  @ApiProperty({
    description: 'Debe ser un texto con la descripción del producto',
  })
  description!: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  @ApiProperty({
    description: 'El precio debe ser un número decimal de hasta 10 dígitos',
    example: '50.00',
  })
  price!: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  @ApiProperty({
    description: 'Debe ser un número entero',
    example: '20',
  })
  stock!: number;

  @Column({
    type: 'text',
    default:
      'https://img.freepik.com/foto-gratis/signo-ventas-viernes-negro-luz-neon_23-2151833076.jpg?semt=ais_incoming&w=740&q=80',
  })
  @ApiProperty({
    description:
      'Debe ser una URL válida, que finalice en .jpg/.jpeg/.png/.webp',
  })
  imgUrl!: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  @ApiProperty({
    description:
      'Define si el producto esta Activo o no, por defecto se inicia como "isActive = true"',
  })
  isActive!: boolean;

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: false,
  })
  category!: Category;

  @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
  orderDetails!: OrderDetail[];
}
