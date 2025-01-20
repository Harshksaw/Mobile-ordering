import { useEffect, useState } from "react";

import axios from "axios";

export interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  sizes: { name: string; price: number; quantity: string }[];
  image: string;
}
const Menu = () => {
  const [menuDetails, setMenuDetails] = useState<MenuItem[]>([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const getMenuDetails = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/menu/getAllMenuItems`);
      if (res.data.success) {
        console.log("res.data.items", res.data.items);
        setMenuDetails(res.data.items);
      }
    } catch (error) {
      console.log("Error fetching menu details", error);
    }
  };

  useEffect(() => {
    getMenuDetails();
  }, []);
  return (
    <div>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Menu Details</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Image</th>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Description</th>
                <th className="px-4 py-2 border-b">Price</th>
                <th className="px-4 py-2 border-b">Sizes</th>
              </tr>
            </thead>
            <tbody>
              {menuDetails?.map((item: Item) => (
                <tr key={item._id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b text-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover"
                    />
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {item.name}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {item.description}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {item.sizes.map((size, index) => (
                      <div key={index}>
                        <span>
                          {size.name} - ${size.price.toFixed(2)} (
                          {size.quantity})
                        </span>
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Menu;
