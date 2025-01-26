export interface CartItem {
  _id: number;
  name: string;
  price: string;
  quantity: number;
  description: string;
  image?: string;
}

export interface MenuItem {
  id: number;
  _id: number;
  name: string;
  price: string;
  description: string;
  image?: string;
  category: string;
} 