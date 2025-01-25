import axios from "axios";
import { CartItem } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchMenu = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/menu/getAllMenuItems`);
    return response.data;
  } catch (error) {
    console.error('Error fetching menu:', error);
    throw error;
  }
};

export const submitOrder = async (order: CartItem[]) => {
  try {
    const response = await fetch(`${API_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
    return response.json();
  } catch (error) {
    console.error('Error submitting order:', error);
    throw error;
  }
}; 