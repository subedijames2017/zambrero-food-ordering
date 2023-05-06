import {
  BadRequestException,
  Body,
  Controller,
  Get,
  ParseArrayPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { SuccessResponse } from '../dto/response.dto';
import { OrderService } from '../service/order.service';
import { OrdersDto } from '../dto/orders.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getOrders(): OrdersDto[] {
    return this.orderService.getOrders();
  }

  @Post()
  orderFood(
    @Body(new ParseArrayPipe({ items: OrdersDto }))
    orders: OrdersDto[],
  ): SuccessResponse {
    if (orders.length <= 0) {
      throw new BadRequestException('Empty Body');
    }
    return this.orderService.orderFoods(orders);
  }
}
