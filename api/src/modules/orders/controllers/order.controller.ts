import {
  BadRequestException,
  Body,
  Controller,
  Get,
  ParseArrayPipe,
  Post,
} from '@nestjs/common';
import { SuccessResponse } from '../dto/response.dto';
import { OrderService } from '../service/order.service';
import { OrdersDto } from '../dto/orders.dto';
import * as moment from 'moment-timezone';
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getOrders(): OrdersDto[] {
    return this.orderService.getOrders();
  }

  @Post()
  orderFood(
    @Body(
      new ParseArrayPipe({
        items: OrdersDto,
        forbidUnknownValues: true, // forbid unknown value from request body
      }),
    )
    orders: OrdersDto[],
  ): SuccessResponse {
    const currentTime = moment().tz('Australia/Sydney');

    // Check if the current time is between 10am-10pm AEST
    const isTimeInRange = currentTime.isBetween(
      moment(currentTime).set('hour', 10).set('minute', 0),
      moment(currentTime).set('hour', 22).set('minute', 0),
    );
    if (!isTimeInRange) {
      throw new BadRequestException(
        'Ordering allowed between between 10am-10pm AEST',
      );
    }
    if (orders.length <= 0) {
      throw new BadRequestException('Empty Body');
    }
    return this.orderService.orderFoods(orders);
  }
}
