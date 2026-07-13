import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/CreateOrder.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/orders.entity';
import { In, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/products.entity';
import { OrderDetail } from '../orderDetails/entities/orderDetails.entity';
import { AddOrderResponseDto } from './dto/AddOrderResponse.dto';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private readonly ordersOrmRepository: Repository<Order>,

    @InjectRepository(User)
    private readonly usersOrmRepository: Repository<User>,

    @InjectRepository(Product)
    private readonly productsOrmRepository: Repository<Product>,

    @InjectRepository(OrderDetail)
    private readonly orderDetailsOrmRepository: Repository<OrderDetail>,
  ) {}

  async getAllOrder(): Promise<Order[]> {
    return await this.ordersOrmRepository.find();
  }

  async getOrderById(id: string): Promise<Order> {
    const order = await this.ordersOrmRepository.findOne({
      where: { id },
      relations: {
        user: true,
        orderDetail: {
          products: true,
        },
      },
      select: {
        id: true,
        date: true,
        user: {
          id: true,
          name: true,
          email: true,
          phone: true,
          country: true,
          address: true,
          city: true,
        },
        orderDetail: {
          id: true,
          price: true,
          products: {
            id: true,
            name: true,
            description: true,
            price: true,
            stock: true,
            imgUrl: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Orden con id: ${id} no encontrada`);
    }

    return order;
  }

  async addOrder(orderData: CreateOrderDto): Promise<AddOrderResponseDto> {
    const { userId, products } = orderData;

    const user = await this.usersOrmRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con id: ${userId} no encontrado`);
    }

    const productIds = products.map((product) => product.id);

    const foundProducts = await this.productsOrmRepository.find({
      where: {
        id: In(productIds),
      },
    });

    const availableProducts = foundProducts.filter(
      (product) => product.stock > 0,
    );

    if (!availableProducts.length) {
      throw new NotFoundException(
        'No hay productos disponibles para generar la orden',
      );
    }

    let totalPrice = 0;

    for (const product of availableProducts) {
      totalPrice += Number(product.price);
      product.stock -= 1;
    }

    await this.productsOrmRepository.save(availableProducts);

    const order = this.ordersOrmRepository.create({
      date: new Date(),
      user,
    });

    const savedOrder = await this.ordersOrmRepository.save(order);

    const orderDetail = this.orderDetailsOrmRepository.create({
      price: totalPrice,
      products: availableProducts,
      order: savedOrder,
    });

    const savedOrderDetail =
      await this.orderDetailsOrmRepository.save(orderDetail);

    return {
      id: savedOrder.id,
      date: savedOrder.date,
      user: {
        id: user.id,
        name: user.name,
      },
      orderDetail: {
        id: savedOrderDetail.id,
        price: savedOrderDetail.price,
      },
    };
  }
}
