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
    let newOrder = [...this.orderData, ...orders];
    // store data in descending order based on name
    newOrder.sort((a, b) => b.title.localeCompare(a.title));
    this.orderData = newOrder;
  }
}
