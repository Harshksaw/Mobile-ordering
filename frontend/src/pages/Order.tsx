import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { Edit, Trash } from "lucide-react";
import { toast } from "react-toastify";

interface OrderItem {
  item: string;
  size: string;
  price: number;
  _id: string;
}

interface Order {
  _id: string;
  items: OrderItem[];
  status: string;
  createdAt: string;
  updatedAt: string;
  token: number;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const ordersRef = React.useRef<Order[]>([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const socket = io(`${BASE_URL}`);

    socket.on("connect", () => {
      console.log("Connected to socket server");
      socket.emit("joinGroup", "12345");
    });

    socket.on("order-created", (data) => {
      console.log("New order created", data);
      // ordersRef.current = [...ordersRef.current, data];
      ordersRef.current = [data, ...ordersRef.current];
      setOrders([...ordersRef.current]);
      toast.success("New order added");
    });

    return () => {
      socket.disconnect();
    };
  }, [BASE_URL]);
  const getOrders = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/order/getAllOrder`);
      if (res.data.success) {
        ordersRef.current = res.data.orders;
        setOrders(res.data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Token</th>
              <th className="px-4 py-2 border-b">Item</th>
              <th className="px-4 py-2 border-b">size</th>
              <th className="px-4 py-2 border-b">price</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Update Status</th>
              {/* <th className="px-4 py-2 border-b">Created At</th> */}
              {/* <th className="px-4 py-2 border-b">Updated At</th> */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order._id}>
                {order.items.map((item, index) => (
                  <tr key={item._id} className="hover:bg-gray-100">
                    {index === 0 && (
                      <td
                        className="px-4 py-2 border-b border text-center"
                        rowSpan={order.items.length}
                      >
                        {order.token}
                      </td>
                    )}
                    <td className="px-4 py-2 border-b text-center">
                      {item.item.name}
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      {item.size}
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      ${item.price.toFixed(2)}
                    </td>
                    {index === 0 && (
                      <td
                        className="px-4 py-2 border-b border text-center"
                        rowSpan={order.items.length}
                      >
                        {order.status}
                      </td>
                    )}
                    <td className="px-4 py-2 border-b flex justify-center">
                      <Edit />
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
