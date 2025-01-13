import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Item {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const ViewItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const getItems = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/menu/getAllMenuItems`);
      if (res.data.success) {
        setItems(res.data.items);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };
  const onDelete = async (id: string) => {
    const res = await axios.post(
      `${BASE_URL}/menu/deleteMenuItem/${id}`
      //  {
      // params: {
      //   id: id,
      // },
      // }
    );
    if (res.data.success) {
      console.log("Item deleted successfully");
      toast.success("Item deleted successfully");
      getItems();
    }
  };

  useEffect(() => {
    getItems();
  }, []);
  return (
    <div className="container  mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Items List</h2>
      <table className="min-w-full bg-white border border-gray-200  px-4">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left">Image</th>
            <th className="px-4 py-2 border-b">Name</th>
            <th className="px-4 py-2 border-b">Description</th>
            <th className="px-4 py-2 border-b">Price</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody className="">
          {items.map((item) => (
            <tr key={item._id} className="hover:bg-gray-100 ">
              <td className="px-4 py-2 border-b text-center">
                <img src={item.image} alt={item.name} width="50" height="50" />
              </td>
              <td className="px-4  py-2 border-b text-center">{item.name}</td>
              <td className="px-4 py-2 border-b text-center">
                {item.description}
              </td>
              <td className="px-4 py-2 border-b text-center">
                ${item.price.toFixed(2)}
              </td>
              <td className="px-4 py-2 border-b text-center">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                  onClick={() => onDelete(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewItems;
