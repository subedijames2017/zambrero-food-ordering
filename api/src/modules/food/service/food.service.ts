import { Injectable, StreamableFile } from '@nestjs/common';
import { readFileSync } from 'fs';

@Injectable()
export class FoodService {
  getFoods(): any {
    try {
      // reading file product.json and sending to the client
      let fileContent: any = readFileSync('./product.json', 'utf8');
      fileContent = JSON.parse(fileContent);
      return fileContent.products;
    } catch (error) {
      throw error;
    }
  }
}
