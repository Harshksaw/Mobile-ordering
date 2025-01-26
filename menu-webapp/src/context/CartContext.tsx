'use client'

import { createContext, useContext, ReactNode } from 'react';
import { useCart } from '@/hooks/useCart';
import { CartItem } from '@/types';

interface CartContextType {
  cart: CartItem[];
  itemCount: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const cartData = useCart();

  return (
    <CartContext.Provider value={cartData}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
} 