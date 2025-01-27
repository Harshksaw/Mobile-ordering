"use client";

import dynamic from "next/dynamic";
import { Suspense, useState, useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import { Header } from "@/components/layout/Header";
import { MenuGrid } from "@/components/menu/MenuGrid";
import { Progress } from "@/components/ui/progress";
import { FaTicketAlt } from "react-icons/fa";
import { tokenStorage } from "@/lib/tokenStorage";

const CartModal = dynamic(() => import("../components/cart/CartModal"), {
  loading: () => <Progress value={63} />,
  ssr: false,
});

export default function HomePage() {
  const [showCart, setShowCart] = useState(false);
  const { cart, itemCount, addToCart, removeFromCart } = useCart();

  const [token, setToken] = useState<number>(0);

  useEffect(() => {
    // Check for existing token on component mount
    const savedToken = tokenStorage.getToken();
    if (savedToken) {
      setToken(savedToken);
    }
  }, [cart, removeFromCart]);

  const changeToken = async (newToken: number) => {
    setToken(newToken);
    tokenStorage.setToken(newToken);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header
        itemCount={itemCount}
        onCartClick={() => setShowCart(true)}
        token={token}
      />
      <div className="w-42 fixed top-20 right-32 text-center z-40">
        {!token && (
          <div className="text-yellow-400 text-xl font-bold">
            <h2 className="text-center">Order and get your Token here</h2>
          </div>
        )}

        {token && (
          <div className="relative group">
            <div
              className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 
              rounded-lg blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <div
              className="relative bg-gray-900 rounded-lg p-3 flex items-center gap-3 
              border-2 border-yellow-500/50 group-hover:border-yellow-400 transition-all duration-300"
            >
              <div className="flex flex-col">
                <span className="text-gray-100 text-sm font-medium">
                  Order Token
                </span>
                <span className="text-yellow-400 text-2xl font-bold tracking-wider">
                  #{String(token).padStart(3, "0")}
                </span>
              </div>
              <div className="h-10 w-10 bg-yellow-500/10 rounded-full flex items-center justify-center">
                <FaTicketAlt className="text-yellow-400 w-5 h-5" />
              </div>
            </div>
          </div>
        )}
      </div>

      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8 text-center">
          {process.env.NEXT_PUBLIC_SITE_NAME}
        </h1>

        <Suspense fallback={<Progress value={33} />}>
          {/* @ts-expect-error: Suspense component requires a fallback */}
          <MenuGrid onAddToCart={addToCart} />
        </Suspense>

        {showCart && (
          <CartModal
            cart={cart}
            token={token}
            changeToken={changeToken}
            onClose={() => setShowCart(false)}
            onRemoveItem={removeFromCart}
          />
        )}
      </main>
    </div>
  );
}
