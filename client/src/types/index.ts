export type FoodStoreItemProps = {
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
};
export type CartItemProps = {
  productId: string;
  title: string;
  description: string | null;
  imageUrl: string;
  retailPrice: number;
  quantity: number;
};
export type CartItemFromProduct = {
  productId: string;
  title: string;
  description: string | null;
  imageUrl: string;
  retailPrice: number;
};
// Storing only id and quntatity on cart so that we can fetch updated reatial price and make order later.
export type CartItem = {
  productId: string;
  title: string;
  description: string | null;
  imageUrl: string;
  retailPrice: number;
  quantity: number;
};

export type SuccessMessage = {
  success: boolean;
  message: string;
};
