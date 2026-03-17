import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Categories } from '../../categories/entities/categories.entity';
import { OrderDetails } from '../../orders/entities/orderdetails.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'PRODUCTS' })
export class Products {

  @ApiProperty({
    example: 'uuid-product'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Laptop Lenovo'
  })
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @ApiProperty({
    example: 'Laptop empresarial'
  })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({
    example: 2500
  })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ApiProperty({
    example: 10
  })
  @Column({ type: 'int' })
  stock: number;

  @ApiProperty({
    example: 'https://img.com/product.jpg'
  })
  @Column({
    type: 'text',
    default: 'https://via.placeholder.com/150'
  })
  imageURL: string;

  @ApiProperty({
    description: 'Categoría del producto',
    type: () => Categories,
    example: { id: 'uuid-category' }
  })
  @ManyToOne(() => Categories, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Categories;

  @ApiProperty({
    description: 'Detalles de orden',
    type: () => [OrderDetails],
    example: []
  })
  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
  orderDetails: OrderDetails[];
}