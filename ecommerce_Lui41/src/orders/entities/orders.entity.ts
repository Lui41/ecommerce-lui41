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
    description: 'UUID V4 generado por la BBDD',
  })
  id!: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  @ApiProperty({
    description: 'La fecha debe tener formato dd/mm/yyyy',
    example: '15/04/2026',
  })
  date!: Date;

  @ManyToOne(() => User, (user) => user.orders, { nullable: false })
  user!: User;

  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetail!: OrderDetail;
}
