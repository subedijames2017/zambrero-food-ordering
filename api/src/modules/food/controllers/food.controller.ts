import { Controller, Get } from '@nestjs/common';
import { FoodService } from '../service/food.service';

@Controller('foods')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get()
  getFoods(): any {
    return this.foodService.getFoods();
  }
}
