import { Injectable } from '@nestjs/common';
import { SuccessResponse } from '../dto/response.dto';
import { OrdersDto } from '../dto/orders.dto';
import { StorageService } from 'src/modules/storage/storage.service';

@Injectable()
export class OrderService {
  constructor(private readonly storageService: StorageService) {}
  orderFoods(orders: OrdersDto[]): SuccessResponse {
    try {
      // TODO implementation of payment service

      // to avoid unnecessery data injection only adding necessery data.

      this.storageService.addOrder(orders);
      return {
        success: true,
        message: 'Order Created Sucessfully',
      };
    } catch (error) {
      throw error;
    }
  }

  getOrders(): OrdersDto[] {
    try {
      return this.storageService.getOrders();
    } catch (error) {
      throw error;
    }
  }
}
