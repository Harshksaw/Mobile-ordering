'use client'

import dynamic from 'next/dynamic';
import { Suspense, useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { Header } from '@/components/layout/Header';
import { MenuGrid } from '@/components/menu/MenuGrid';

// const CartModal = dynamic(() => import('../components/cart/CartModal'), {
//   loading: () => <div>Loading...</div>,
//   ssr: false
// });

export default function HomePage() {
  const [showCart, setShowCart] = useState(false);
  const { cart, itemCount, addToCart, removeFromCart } = useCart();

  return (
    <div className="min-h-screen bg-gray-900">
      <Header
        itemCount={itemCount} 
        onCartClick={() => setShowCart(true)} 
      />

      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8 text-center">
          {process.env.NEXT_PUBLIC_SITE_NAME}
        </h1>

        <Suspense fallback={<div>Loading menu...</div>}>
          <MenuGrid onAddToCart={addToCart} />
        </Suspense>

        {/* {showCart && (
          <CartModal
            cart={cart}
            onClose={() => setShowCart(false)}
            onRemoveItem={removeFromCart}
          />
        )} */}
      </main>
    </div>
  );
}