import { ApiProperty } from '@nestjs/swagger';
import { OrderDetail } from '../../orderDetails/entities/orderDetails.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'orders',
})
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Order UUID v4',
    example: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
  })
  id!: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  @ApiProperty({
    description: 'Order date',
    example: '2026-07-17',
  })
  date!: Date;

  @ManyToOne(() => User, (user) => user.orders, { nullable: false })
  @ApiProperty({
    description: 'Order owner',
    type: () => User,
  })
  user!: User;

  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order)
  @ApiProperty({
    description: 'Order detail information',
    type: () => OrderDetail,
  })
  orderDetail!: OrderDetail;
}
