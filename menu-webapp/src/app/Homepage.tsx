'use client'

import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaShoppingCart } from 'react-icons/fa';
import getOrCreateUniqueId from '@/lib/token';

const HomePage = () => {
  const [cart, setCart] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const uniqueId = getOrCreateUniqueId();
    if (uniqueId) {
      console.log('User ID:', uniqueId);
    }
  }, []);



  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
    setItemCount((prevCount) => prevCount + 1);
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== itemId)
    );
    setItemCount((prevCount) => prevCount - 1);
  };

  const cartStyles = {
    position: 'fixed',
    top: '4rem',
    right: '1rem',
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '0.5rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 50,
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="fixed top-4 right-4 z-50">
        <button 
          onClick={toggleCart}
          className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <FaShoppingCart className="w-6 h-6" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
      </div>

      {showCart && (
        <div style={cartStyles} className="w-64">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Shopping Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            <ul className="space-y-3">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Our Menu</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { id: 1, name: 'Item 1', price: '$9.99', description: 'Delicious item description' },
            { id: 2, name: 'Item 2', price: '$12.99', description: 'Amazing item description' },
            { id: 3, name: 'Item 3', price: '$10.99', description: 'Fantastic item description' },
          ].map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <p className="text-lg font-bold text-gray-800 mb-4">{item.price}</p>
                <button 
                  onClick={() => addToCart(item)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )}

  
export default HomePage;