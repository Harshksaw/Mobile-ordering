'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaShoppingCart, FaUser, FaCheck } from 'react-icons/fa';
import { useCartContext } from '@/context/CartContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart } = useCartContext();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });

  const total = cart.reduce((sum, item) => 
    sum + (parseFloat(item.price) * item.quantity), 0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      console.log('Order submitted:', { ...formData, cart, total });
      router.push('/order-confirmation');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-8">
      <div className="flex items-center">
        <div className={`flex items-center justify-center w-10 h-10 rounded-full 
          ${step >= 1 ? 'bg-yellow-500' : 'bg-gray-700'}`}>
          <FaShoppingCart className="text-gray-900" />
        </div>
        <div className={`w-20 h-1 ${step >= 2 ? 'bg-yellow-500' : 'bg-gray-700'}`} />
        <div className={`flex items-center justify-center w-10 h-10 rounded-full 
          ${step >= 2 ? 'bg-yellow-500' : 'bg-gray-700'}`}>
          <FaUser className="text-gray-900" />
        </div>
        <div className={`w-20 h-1 ${step === 3 ? 'bg-yellow-500' : 'bg-gray-700'}`} />
        <div className={`flex items-center justify-center w-10 h-10 rounded-full 
          ${step === 3 ? 'bg-yellow-500' : 'bg-gray-700'}`}>
          <FaCheck className="text-gray-900" />
        </div>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-yellow-400 mb-4">Order Summary</h2>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between mb-2 text-gray-300">
                <span>{item.name} x {item.quantity}</span>
                <span>Rs {(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-gray-700 mt-4 pt-4">
              <div className="flex justify-between text-xl">
                <span className="font-semibold text-white">Total</span>
                <span className="text-yellow-400 font-bold">Rs {total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-yellow-400 mb-4">Your Details</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full bg-gray-700 text-white rounded-md px-4 py-2"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-300 mb-2">Phone</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={10}
                  required
                  placeholder="Enter your phone number"
                  className="w-full bg-gray-700 text-white rounded-md px-4 py-2"
                />
              </div>
            </div>
          </form>
        );
      case 3:
        return (
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-yellow-400 mb-4">Confirm Order</h2>
            <div className="space-y-4">
              <div className="border-b border-gray-700 pb-4">
                <h3 className="text-white font-medium mb-2">Order Details</h3>
                {cart.map((item) => (
                  <div key={item.id} className="text-gray-300">
                    {item.name} x {item.quantity}
                  </div>
                ))}
                <div className="text-yellow-400 font-bold mt-2">
                  Total: Rs {total.toFixed(2)}
                </div>
              </div>
              <div className="border-b border-gray-700 pb-4">
                <h3 className="text-white font-medium mb-2">Customer Details</h3>
                <div className="text-gray-300">Name: {formData.name}</div>
                <div className="text-gray-300">Phone: {formData.phone}</div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-yellow-400 mb-8 text-center">Checkout</h1>
        {renderStepIndicator()}
        {renderStep()}
        <div className="mt-6 flex justify-between">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="bg-gray-700 text-white py-3 px-6 rounded-md 
                hover:bg-gray-600 transition-colors font-bold"
            >
              Back
            </button>
          )}
          <button
            onClick={handleSubmit}
            className="ml-auto bg-yellow-500 text-gray-900 py-3 px-6 rounded-md 
              hover:bg-yellow-400 transition-colors font-bold"
          >
            {step === 3 ? 'Place Order' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
} 