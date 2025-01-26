import { useState } from 'react';
import { CartItem } from '@/types';
import { FaTimes, FaShoppingCart, FaUser, FaCheck } from 'react-icons/fa';
import axios from 'axios';
import { API_URL } from '@/lib/api';
import getOrCreateUniqueId from '@/lib/token';

interface CartModalProps {
  cart: CartItem[];
  onClose: () => void;
  onRemoveItem: (id: number) => void;
}

const CartModal = ({ cart, onClose, onRemoveItem }: CartModalProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });

  const total = cart.reduce((sum, item) => sum + (parseFloat(item?.price) * item.quantity), 0);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      try {
        const orderData = {
          clientId: getOrCreateUniqueId(),
          items: cart.map(item => ({
            item: item._id,
            quantity: item.quantity,
            price: parseFloat(item.price),
            name: item.name
          })),
          totalAmount: total,
          customerName: formData.name,
          customerPhone: formData.phone,
          status: 'pending'
        };

        const res = await axios.post(`${API_URL}/api/v1/order/createOrder`, orderData);
        console.log("🚀 ~ handleSubmit ~ res:", res);
        
        if (res.data.success) {
          // Show success message or redirect
          onClose();
        }
      } catch (error) {
        console.error('Error creating order:', error);
        // Show error message to user
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-6">
      <div className="flex items-center">
        <div className={`flex items-center justify-center w-8 h-8 rounded-full 
          ${step >= 1 ? 'bg-yellow-500' : 'bg-gray-700'}`}>
          <FaShoppingCart className="text-gray-900 w-4 h-4" />
        </div>
        <div className={`w-12 h-1 ${step >= 2 ? 'bg-yellow-500' : 'bg-gray-700'}`} />
        <div className={`flex items-center justify-center w-8 h-8 rounded-full 
          ${step >= 2 ? 'bg-yellow-500' : 'bg-gray-700'}`}>
          <FaUser className="text-gray-900 w-4 h-4" />
        </div>
        <div className={`w-12 h-1 ${step === 3 ? 'bg-yellow-500' : 'bg-gray-700'}`} />
        <div className={`flex items-center justify-center w-8 h-8 rounded-full 
          ${step === 3 ? 'bg-yellow-500' : 'bg-gray-700'}`}>
          <FaCheck className="text-gray-900 w-4 h-4" />
        </div>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="flex-1 overflow-y-auto mb-6">
              <div className="grid grid-cols-2 gap-4">
                {cart.map((item) => (
                  <div 
                    key={item._id} 
                    className="bg-gray-700 rounded-lg p-4 flex flex-col justify-between relative"
                  >
            

                    <div className='flex flex-col justify-center items-start'>
                      <h3 className="text-white font-medium text-sm mb-1 pr-12">{item.name}</h3>
                      <p className="text-gray-300 text-sm">Quantity: {item.quantity}</p>
                      <p className="text-yellow-400 font-bold mt-1">
                        Total: Rs {(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item._id)}
                      className="mt-2 text-red-400 hover:text-red-300 text-sm py-1 px-2
                        border border-red-400 rounded hover:bg-red-400/10 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <div className="flex-1">
            <div className="space-y-10">
              <div className='space-y-4'>
                <label htmlFor="name" className="block text-gray-300 mb-2  text-2xl font-bold">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your  name"
                  className="w-full bg-gray-700 text-xl text-white rounded-md px-4 py-4"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-300 mb-2 text-2xl font-bold">Phone</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={10}
                  required
                  placeholder="Enter your phone number"
                  className="w-full bg-gray-700 text-xl text-white rounded-md px-4 py-4"
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex-1">
            <div className="space-y-4">
              <div className="border-b border-gray-700 pb-4">
                <h3 className="text-white font-medium mb-2">Order Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  {cart.map((item) => (
                    <div key={item.id} className="text-gray-300 bg-gray-700/50 p-3 rounded">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm">Quantity: {item.quantity}</div>
                      <div className="text-yellow-400 mt-1">
                        Rs {(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-gray-800 w-full max-w-md h-full p-6 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-yellow-400">
            {step === 1 ? 'Your Cart' : step === 2 ? 'Your Details' : 'Confirm Order'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
            aria-label="Close cart"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="text-gray-400 text-center text-2xl">Your cart is empty</p>
        ) : (
          <>
            {renderStepIndicator()}
            {renderStep()}
            <div className="border-t border-gray-700 pt-4 mt-auto">
              <div className="flex justify-between items-center mb-6">
                <span className="text-white text-lg">Total:</span>
                <span className="text-yellow-400 text-2xl font-bold">Rs {total.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between gap-4">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="flex-1 bg-gray-700 text-white py-3 px-4 rounded-md 
                      hover:bg-gray-600 transition-colors font-bold"
                  >
                    Back
                  </button>
                )}
                <button 
                  onClick={() => handleSubmit()}
                  className="flex-1 bg-yellow-500 text-gray-900 py-3 px-4 rounded-md 
                    hover:bg-yellow-400 transition-colors font-bold text-center"
                >
                  {step === 3 ? 'Place Order' : 'Continue'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal; 