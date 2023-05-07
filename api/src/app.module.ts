import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodController } from './modules/food/controllers/food.controller';
import { FoodService } from './modules/food/service/food.service';
import { OrderService } from './modules/orders/service/order.service';
import { StorageService } from './modules/storage/storage.service';
import { OrderController } from './modules/orders/controllers/order.controller';
import { FoodModule } from './modules/food/food.module';
import { OrdersModule } from './modules/orders/order.module';
import { StorageModule } from './modules/storage/storeage.modulet';
import { APP_PIPE } from '@nestjs/core';
import { AppGateway } from './app.gateway';

@Module({
  imports: [FoodModule, OrdersModule, StorageModule],
  controllers: [AppController, FoodController, OrderController],
  providers: [
    StorageService,
    AppService,
    FoodService,
    OrderService,
    AppGateway,
  ],
})
export class AppModule {}
