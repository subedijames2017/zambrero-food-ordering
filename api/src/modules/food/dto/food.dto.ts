export class FoodDto {
  productId: string;
  title: string;
  description: string | null;
  imageUrl: string;
  retailPrice: number;
  category: {
    name: string;
    priority: number;
    displaySize: string;
  };
}
