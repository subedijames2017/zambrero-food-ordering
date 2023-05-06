import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class OrdersDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  description: string | null;

  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @IsNotEmpty()
  @IsNumber()
  @IsNotEmpty()
  retailPrice: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class OrderDtoArray {
  @ValidateNested({ each: true })
  @Type(() => OrdersDto)
  items: OrdersDto[];
}
