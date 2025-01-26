import { useState, useCallback } from 'react';
import { CartItem } from '@/types';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  console.log("🚀 ~ useCart ~ cart:", cart)
  const [itemCount, setItemCount] = useState(0);

  const addToCart = useCallback((item: CartItem) => {
    console.log("🚀 ~ addToCart ~ item:", item)
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem._id === item._id);
      console.log("🚀 ~ setCart ~ existingItem:", existingItem)
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    setItemCount((prev) => prev + 1);
  }, []);

  const removeFromCart = useCallback((itemId: number) => {
    setCart((prev) => prev.filter((item) => item._id !== itemId));
    setItemCount((prev) => prev - 1);
  }, []);

  return { cart, itemCount, addToCart, removeFromCart };
}; 