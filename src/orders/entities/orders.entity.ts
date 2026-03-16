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

@Entity({
  name: 'ORDERS',
})
export class Orders {

  @ApiProperty({
    description: 'Identificador único de la orden',
    example: '3f6a2c91-6d7e-4c8f-a2c3-5b9e1d4f7012',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Fecha en la que se creó la orden',
    example: '2026-03-16T15:30:00.000Z',
  })
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date;

  @ApiProperty({
    description: 'Detalle de la orden que contiene los productos comprados',
    type: () => OrderDetails,
  })
  @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
  orderDetails: OrderDetails;

  @ApiProperty({
    description: 'Usuario que realizó la orden',
    type: () => Users,
  })
  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}