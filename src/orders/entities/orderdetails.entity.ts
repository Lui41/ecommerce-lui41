import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Orders } from './orders.entity';
import { Products } from '../../products/entities/products.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'ORDERDETAILS' })
export class OrderDetails {

  @ApiProperty({
    example: 'uuid-order-detail'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 199.99
  })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ApiProperty({
    type: () => Orders,
    example: { id: 'uuid-order' }
  })
  @OneToOne(() => Orders, (order) => order.orderDetails)
  @JoinColumn({ name: 'order_id' })
  order: Orders;

  @ApiProperty({
    description: 'Productos de la orden',
    type: () => [Products],
    example: []
  })
  @ManyToMany(() => Products, (product) => product.orderDetails)
  @JoinTable({
    name: 'ORDERDETAILS_PRODUCTS',
  })
  products: Products[];
}