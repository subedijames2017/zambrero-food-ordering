import { createContext, ReactNode, useContext, useState } from "react";
import { OrderingCart } from "../components/OrderingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { CartItem, CartItemFromProduct, SuccessMessage } from "../types";
import { orderFood } from "../service";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/Spinner";

type OrderingCartProviderProps = {
  children: ReactNode;
};

type OrderingCartContextList = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: string) => number;
  increaseCartQuantity: (cartItem: CartItemFromProduct) => void;
  decreaseCartQuantity: (cartItem: CartItemFromProduct) => void;
  removeFromCart: (id: string) => void;
  orderFromCart: () => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

const OrderingCartContext = createContext({} as OrderingCartContextList);

export function useOrderingCart() {
  return useContext(OrderingCartContext);
}
export function OrderingCartProvider({ children }: OrderingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLodaing, setLoading] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "ordering-cart",
    []
  );
  const navigate = useNavigate();

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  function getItemQuantity(id: string) {
    return cartItems.find((item) => item.productId === id)?.quantity || 0;
  }
  function increaseCartQuantity(cartItem: CartItemFromProduct) {
    setCartItems((currItems) => {
      if (
        currItems.find((item) => item.productId === cartItem.productId) == null
      ) {
        return [
          ...currItems,
          {
            productId: cartItem.productId,
            quantity: 1,
            title: cartItem?.title || "",
            description: cartItem?.description || "",
            imageUrl: cartItem?.imageUrl || "",
            retailPrice: cartItem?.retailPrice || 0,
          },
        ];
      } else {
        return currItems.map((item) => {
          if (item.productId === cartItem.productId) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function decreaseCartQuantity(cartItem: CartItemFromProduct) {
    setCartItems((currItems) => {
      if (
        currItems.find((item) => item.productId === cartItem.productId)
          ?.quantity === 1
      ) {
        return currItems.filter(
          (item) => item.productId !== cartItem.productId
        );
      } else {
        return currItems.map((item) => {
          if (item.productId === cartItem.productId) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function removeFromCart(id: string) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.productId !== id);
    });
  }
  async function orderFromCart() {
    try {
      setLoading(true);
      let response: any = await orderFood(cartItems);
      if (response.success) {
        setCartItems([]);
        setLoading(false);
        navigate("/orders", { replace: true });
      }
    } catch (error: any) {
      // TODO implement proper error snsckbar
      setLoading(true);
      alert(error.message);
    }
  }

  return (
    <OrderingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
        orderFromCart,
      }}
    >
      {children}
      <OrderingCart isOpen={isOpen} />
      {isLodaing && <LoadingSpinner />}
    </OrderingCartContext.Provider>
  );
}
