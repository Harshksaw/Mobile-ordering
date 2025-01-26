import { useState } from "react";
import { CartItem } from "@/types";
import { FaTimes, FaShoppingCart, FaUser, FaCheck } from "react-icons/fa";
import axios from "axios";
import { API_URL } from "@/lib/api";
import getOrCreateUniqueId from "@/lib/token";
import { tokenStorage } from "@/lib/tokenStorage";

interface CartModalProps {
  cart: CartItem[];
  token: number;
  onClose: () => void;
  onRemoveItem: (id: number) => void;
  changeToken: (token: number) => void;
}

const CartModal = ({
  cart,
  onClose,
  onRemoveItem,
  changeToken,
}: CartModalProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const total = cart.reduce(
    (sum, item) => sum + parseFloat(item?.price) * item.quantity,
    0
  );

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      try {
        const clientId = getOrCreateUniqueId();
        const orderData = {
          clientId,
          items: cart.map((item) => ({
            item: item._id,
            quantity: item.quantity,
            price: parseFloat(item.price),
            name: item.name,
          })),
          totalAmount: total,
          customerName: formData.name,
          customerPhone: formData.phone,
          status: "pending",
        };

        const res = await axios.post(
          `${API_URL}/api/v1/order/createOrder`,
          orderData
        );

        if (res.data.success) {
          const newToken = res.data.data.token;
          changeToken(newToken);
          tokenStorage.setToken(newToken);
          onClose();
        }
      } catch (error) {
        console.error("Error creating order:", error);
        // Show error message to user
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-6">
      <div className="flex items-center">
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full 
          ${step >= 1 ? "bg-yellow-500" : "bg-gray-700"}`}
        >
          <FaShoppingCart className="text-gray-900 w-4 h-4" />
        </div>
        <div
          className={`w-12 h-1 ${step >= 2 ? "bg-yellow-500" : "bg-gray-700"}`}
        />
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full 
          ${step >= 2 ? "bg-yellow-500" : "bg-gray-700"}`}
        >
          <FaUser className="text-gray-900 w-4 h-4" />
        </div>
        <div
          className={`w-12 h-1 ${step === 3 ? "bg-yellow-500" : "bg-gray-700"}`}
        />
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full 
          ${step === 3 ? "bg-yellow-500" : "bg-gray-700"}`}
        >
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
                    className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl p-5 
                      flex flex-col justify-between relative shadow-lg hover:shadow-2xl
                      transition-all duration-300 border border-gray-600 hover:border-yellow-500/30
                      group"
                  >
                    <div className="flex flex-col justify-center items-start space-y-3">
                      <h3 className="text-white font-medium text-lg mb-1 pr-12 group-hover:text-yellow-400">
                        {item.name}
                      </h3>
                      <p className="text-gray-300 text-base bg-gray-800/50 px-3 py-1 rounded-full">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-yellow-400 font-bold text-lg">
                        Total: ₹
                        {(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item._id)}
                      className="mt-4 text-red-400 hover:text-white text-sm py-2 px-4
                        border border-red-400 rounded-lg hover:bg-red-500 
                        transition-all duration-300 w-full font-medium"
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
              <div className="space-y-4">
                <label
                  htmlFor="name"
                  className="block text-gray-300 mb-2 text-2xl font-bold"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  className="w-full bg-gray-700/50 text-xl text-white rounded-xl px-6 py-4
                    border border-gray-600 focus:border-yellow-500 focus:ring-2 
                    focus:ring-yellow-500/20 focus:outline-none transition-all duration-300
                    placeholder:text-gray-400"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-gray-300 mb-2 text-2xl font-bold"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={10}
                  required
                  placeholder="Enter your phone number"
                  className="w-full bg-gray-700/50 text-xl text-white rounded-xl px-6 py-4
                    border border-gray-600 focus:border-yellow-500 focus:ring-2 
                    focus:ring-yellow-500/20 focus:outline-none transition-all duration-300
                    placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex-1">
            <div className="space-y-6">
              <div className="border-b border-gray-700 pb-6">
                <h3 className="text-white font-bold text-xl mb-4">
                  Order Summary
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {cart.map((item) => (
                    <div
                      key={item._id}
                      className="text-gray-300 bg-gray-700/50 p-4 rounded-xl
                        border border-gray-600 hover:border-yellow-500/30"
                    >
                      <div className="font-medium text-lg text-yellow-400">
                        {item.name}
                      </div>
                      <div className="text-base mt-2">
                        Quantity: {item.quantity}
                      </div>
                      <div className="text-lg font-bold mt-2">
                        ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-b border-gray-700 pb-6">
                <h3 className="text-white font-bold text-xl mb-4">
                  Customer Details
                </h3>
                <div
                  className="bg-gray-700/50 p-4 rounded-xl space-y-2
                  border border-gray-600"
                >
                  <div className="text-gray-300 text-lg">
                    Name: {formData.name}
                  </div>
                  <div className="text-gray-300 text-lg">
                    Phone: {formData.phone}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex justify-end backdrop-blur-sm">
      <div
        className="bg-gradient-to-br from-gray-800 to-gray-900 w-full max-w-md h-full p-8 
        flex flex-col shadow-2xl"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-yellow-400">
            {step === 1
              ? "Your Cart"
              : step === 2
              ? "Your Details"
              : "Confirm Order"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:rotate-90 
              transition-all duration-300"
            aria-label="Close cart"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="text-gray-400 text-center text-2xl font-medium">
            Your cart is empty
          </p>
        ) : (
          <>
            {renderStepIndicator()}
            {renderStep()}
            <div className="border-t border-gray-700 pt-6 mt-auto">
              <div className="flex justify-between items-center mb-6">
                <span className="text-white text-xl">Total:</span>
                <span className="text-yellow-400 text-3xl font-bold">
                  ₹{total.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="flex-1 bg-gray-700 text-white py-4 px-6 rounded-xl
                      hover:bg-gray-600 transition-all duration-300 font-bold shadow-lg
                      hover:shadow-xl border border-gray-600 hover:border-gray-500"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={() => handleSubmit()}
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-400 
                    text-gray-900 py-4 px-6 rounded-xl transition-all duration-300
                    font-bold text-center shadow-lg hover:shadow-xl hover:from-yellow-400 
                    hover:to-yellow-500"
                >
                  {step === 3 ? "Place Order" : "Continue"}
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
