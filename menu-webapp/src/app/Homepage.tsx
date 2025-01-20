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

  return (
    <div>
      {/* Optional Navbar component */}
      {/* <Navbar /> */}
      <div className='cart-icon' onClick={toggleCart}>
        <FaShoppingCart />
        {itemCount > 0 && (
          <span className="cart-count">{itemCount}</span>
        )}
      </div>
      {showCart && (
        <div className="cart">
          <h2>Shopping Cart</h2>
          <ul>
            {/* {cart.map((item) => (
              <li key={item.id}>
                {item.name} - {item.quantity}
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))} */}
          </ul>
        </div>
      )}

      <div>

        <div className="item-grid"></div>
          {[
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
            { id: 3, name: 'Item 3' },
          ].map((item) => (
            <div key={item.id} className="item">
              <h3>{item.name}</h3>
              <button onClick={() => addToCart(item)}>Add to Cart</button>
            </div>
          ))}
        </div>

    </div>
  );
};

export default HomePage;