import { Injectable } from '@nestjs/common';
import { OrdersDto } from '../orders/dto/orders.dto';

@Injectable()
export class StorageService {
  // created in memory storage rating data
  private orderData: Array<OrdersDto> = [];
  // get all order
  getOrders() {
    return this.orderData;
  }
  // add order to an array
  addOrder(orders: OrdersDto[]) {
    this.orderData = [...this.orderData, ...orders];
  }
}
