import { Module } from '@nestjs/common';
import { FoodController } from './controllers/food.controller';
import { FoodService } from './service/food.service';

@Module({
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}
