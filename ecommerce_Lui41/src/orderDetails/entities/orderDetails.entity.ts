import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../../orders/entities/orders.entity';
import { Product } from '../../products/entities/products.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'order_details',
})
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Order detail UUID v4',
    example: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
  })
  id!: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  @ApiProperty({
    description: 'Total price for the order',
    example: 50.0,
  })
  price!: number;

  @OneToOne(() => Order, (order) => order.orderDetail, {
    nullable: false,
  })
  @JoinColumn({ name: 'order_id' })
  @ApiProperty({
    description: 'Parent order',
    type: () => Order,
  })
  order!: Order;

  @ManyToMany(() => Product, (product) => product.orderDetails)
  @JoinTable()
  @ApiProperty({
    description: 'Products included in the order detail',
    type: () => [Product],
  })
  products!: Product[];
}
