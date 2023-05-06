import { Module } from '@nestjs/common';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './service/order.service';
import { StorageService } from '../storage/storage.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, StorageService],
})
export class OrdersModule {}
