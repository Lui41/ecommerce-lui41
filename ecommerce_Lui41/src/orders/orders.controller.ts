import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/CreateOrder.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Order } from './entities/orders.entity';
import { AddOrderResponseDto } from './dto/AddOrderResponse.dto';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../auth/enums/roles.enum';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  getAllOrder(): Promise<Order[]> {
    return this.ordersService.getAllOrder();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  getOrderById(@Param('id', ParseUUIDPipe) id: string): Promise<Order> {
    return this.ordersService.getOrderById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  addOrder(@Body() orderData: CreateOrderDto): Promise<AddOrderResponseDto> {
    return this.ordersService.addOrder(orderData);
  }
}
