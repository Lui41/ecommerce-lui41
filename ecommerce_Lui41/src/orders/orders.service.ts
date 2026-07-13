import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/CreateOrder.dto';
import { OrdersRepository } from './orders.repository';
import { Order } from './entities/orders.entity';
import { AddOrderResponseDto } from './dto/AddOrderResponse.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  getAllOrder(): Promise<Order[]> {
    return this.ordersRepository.getAllOrder();
  }

  getOrderById(id: string): Promise<Order> {
    return this.ordersRepository.getOrderById(id);
  }

  addOrder(orderData: CreateOrderDto): Promise<AddOrderResponseDto> {
    return this.ordersRepository.addOrder(orderData);
  }
}
