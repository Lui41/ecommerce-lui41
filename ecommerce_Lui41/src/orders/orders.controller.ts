import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/CreateOrder.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Order } from './entities/orders.entity';
import { AddOrderResponseDto } from './dto/AddOrderResponse.dto';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../auth/enums/roles.enum';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'List orders',
    description: 'Returns all orders. Admin only.',
  })
  @ApiOkResponse({
    description: 'Orders list',
    type: Order,
    isArray: true,
  })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getAllOrder(): Promise<Order[]> {
    return this.ordersService.getAllOrder();
  }

  @Get(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Get order by id',
    description: 'Returns one order with user and products.',
  })
  @ApiOkResponse({
    description: 'Order found',
    type: Order,
  })
  @UseGuards(AuthGuard)
  getOrderById(@Param('id', ParseUUIDPipe) id: string): Promise<Order> {
    return this.ordersService.getOrderById(id);
  }

  @Post()
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Create order',
    description: 'Creates an order for a user using a list of product ids.',
  })
  @ApiCreatedResponse({
    description: 'Order created successfully',
    type: AddOrderResponseDto,
  })
  @UseGuards(AuthGuard)
  addOrder(@Body() orderData: CreateOrderDto): Promise<AddOrderResponseDto> {
    return this.ordersService.addOrder(orderData);
  }
}
