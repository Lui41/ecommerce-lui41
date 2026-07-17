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
    description: 'Product UUID v4',
    example: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
  })
  id!: string;

  @Column({
    length: 50,
    nullable: false,
  })
  @ApiProperty({
    description: 'Product name',
    example: 'Wireless Mouse',
  })
  name!: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  @ApiProperty({
    description: 'Product description',
    example: 'Ergonomic wireless mouse for everyday use',
  })
  description!: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  @ApiProperty({
    description: 'Product price',
    example: 50.0,
  })
  price!: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  @ApiProperty({
    description: 'Available stock',
    example: 20,
  })
  stock!: number;

  @Column({
    type: 'text',
    default:
      'https://img.freepik.com/foto-gratis/signo-ventas-viernes-negro-luz-neon_23-2151833076.jpg?semt=ais_incoming&w=740&q=80',
  })
  @ApiProperty({
    description: 'Image URL',
    example: 'https://example.com/product-image.jpg',
  })
  imgUrl!: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  @ApiProperty({
    description: 'True when the product is active',
  })
  isActive!: boolean;

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: false,
  })
  @ApiProperty({
    description: 'Product category',
    type: () => Category,
  })
  category!: Category;

  @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
  @ApiProperty({
    description: 'Order details that include the product',
    type: () => [OrderDetail],
  })
  orderDetails!: OrderDetail[];
}
