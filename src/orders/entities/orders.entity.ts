import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Users } from '../../users/entities/users.entity';
import { OrderDetails } from './orderdetails.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'ORDERS' })
export class Orders {

  @ApiProperty({
    example: 'uuid-order'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: '2026-03-16T15:30:00.000Z'
  })
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date;

  @ApiProperty({
    type: () => OrderDetails
  })
  @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
  orderDetails: OrderDetails;

  @ApiProperty({
    type: () => Users,
    example: { id: 'uuid-user' }
  })
  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}