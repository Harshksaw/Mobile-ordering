import { CartItem } from '@/types';
import { FaTimes } from 'react-icons/fa';
import Link from 'next/link';

interface CartModalProps {
  cart: CartItem[];
  onClose: () => void;
  onRemoveItem: (id: number) => void;
}

const CartModal = ({ cart, onClose, onRemoveItem }: CartModalProps) => {
  const total = cart.reduce((sum, item) => sum + (parseFloat(item?.price) * item.quantity), 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-gray-800 w-full max-w-md h-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-yellow-400">Your Cart</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
            aria-label="Close cart"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="text-gray-400">Your cart is empty</p>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto mb-6">
              {cart.map((item) => (
                <div 
                  key={item.id} 
                  className="flex justify-between items-center mb-4 p-4 bg-gray-700 rounded-lg"
                >
                  <div>
                    <h3 className="text-white font-medium">{item.name}</h3>
                    <p className="text-gray-300">Quantity: {item.quantity}</p>
                    {/* <p className="text-yellow-400">${parseFloat(item.price.replace('$', '')) * item.quantity}</p> */}
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-700 pt-4">
              <div className="flex justify-between items-center mb-6">
                <span className="text-white text-lg">Total:</span>
                <span className="text-yellow-400 text-2xl font-bold">Rs {total.toFixed(2)}</span>
              </div>
              
              <Link 
                href="/checkout"
                className="w-full bg-yellow-500 text-gray-900 py-3 px-4 rounded-md 
                  hover:bg-yellow-400 transition-colors font-bold text-center block"
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal; 