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
    description: 'El id debe ser de tipo UUID versión 4',
    example: '...',
  })
  id!: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  @ApiProperty({
    description: 'Debe ser un número decimal de hasta 10 dígitos',
    example: '50.00',
  })
  price!: number;

  @OneToOne(() => Order, (order) => order.orderDetail, {
    nullable: false,
  })
  @JoinColumn({ name: 'order_id' })
  order!: Order;

  @ManyToMany(() => Product, (product) => product.orderDetails)
  @JoinTable()
  products!: Product[];
}
