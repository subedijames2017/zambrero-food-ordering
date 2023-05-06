export type FoodStoreItemProps = {
    productId: string,
    title: string,
    description: string | null
    imageUrl: string
    retailPrice: number,
    category: {
      name: string
      priority: number
      displaySize: string
    }
  }
  export type CartItemProps = {
    id: string
    quantity: number
  }
  // Storing only id and quntatity on cart so that we can fetch updated reatial price and make order later.
  export type CartItem = {
    id: string
    quantity: number
  }