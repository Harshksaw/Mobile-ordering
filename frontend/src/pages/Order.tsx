import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { Edit } from "lucide-react";
import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditOrderStatus from "@/components/EditOrderStatus";
import { Link } from "react-router-dom";

// export interface OrderItem {
//   // _id: string;
//   item: string;
//   name: string;
//   price: number;
//   quantity: number;
// }

// export interface Order {
//   _id: string;
//   clientId: string;
//   customerName: string;
//   customerPhone: string;
//   items: {
//     // _id: string;
//     item: OrderItem[];
//     // size: string;
//     // price: number;
//   }[];
//   status: string;

//   totalAmount: number;
//   createdAt: string;
//   updatedAt: string;
//   token: number;
// }
interface OrderItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  clientId: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  status: string;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  token: number;
}
const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isEditing, setIsEditing] = useState<Order | null>(null);
  const ordersRef = React.useRef<Order[]>([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  // const tokenMap = new Map<number, number>();

  useEffect(() => {
    const socket = io(`${BASE_URL}`);

    socket.on("connect", () => {
      console.log("Connected to socket server");
      // socket.emit("joinGroup", "12345");
    });

    socket.on("order-created", (data) => {
      console.log("New order created", data);
      // ordersRef.current = [...ordersRef.current, data];
      ordersRef.current = [data, ...ordersRef.current];
      setOrders([...ordersRef.current]);
      toast.success("New order added");
    });

    // orders.forEach((row, index) => {
    //   if (!tokenMap.has(row.token)) {
    //     tokenMap.set(row.token, index);
    //   }
    // });
    return () => {
      socket.disconnect();
    };
  }, [BASE_URL]);
  const getOrders = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/order/getAllOrder`);
      if (res.data.success) {
        ordersRef.current = res.data.data;
        setOrders(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  console.log(orders);
  useEffect(() => {
    getOrders();
    // orders.forEach((row, index) => {
    //   if (!tokenMap.has(row.token)) {
    //     tokenMap.set(row.token, index);
    //   }
    // });
  }, [BASE_URL]);

  return (
    <>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Orders</h2>
        <h2 className="text-2xl font-bold mb-4 text-right">
          <Link
            to="/order/new"
            className="bg-blue-500 text-white p-2 rounded text-right mb-4"
          >
            View Completed Orders
          </Link>
        </h2>
        <div className="overflow-x-auto">
          <Table className="min-w-full  bg-white border border-gray-200">
            <TableHeader>
              <TableRow>
                <TableHead className="px-4 py-2 border-b text-center font-bold text-black">
                  Token
                </TableHead>
                <TableHead className="px-4 py-2 border-b text-center font-bold text-black">
                  Item
                </TableHead>
                <TableHead className="px-4 py-2 border-b text-center font-bold text-black">
                  Quantity
                </TableHead>
                <TableHead className="px-4 py-2 border-b text-center font-bold text-black">
                  price
                </TableHead>
                <TableHead className="px-4 py-2 border-b text-center font-bold text-black">
                  Status
                </TableHead>
                <TableHead className="px-4 py-2 font-bold text-center text-black">
                  Update Status
                </TableHead>
                {/* <th className="px-4 py-2 border-b">Created At</th> */}
                {/* <th className="px-4 py-2 border-b">Updated At</th> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <React.Fragment key={order._id}>
                  {order.items.map((item, index) => (
                    <TableRow key={item._id} className="hover:bg-gray-100">
                      {index === 0 && (
                        <TableCell
                          className="px-4 py-2 border-b border text-center"
                          rowSpan={order.items.length}
                        >
                          {order.token}
                        </TableCell>
                      )}
                      <TableCell className="px-4 py-2 border-b text-center">
                        {item.name}
                      </TableCell>
                      <TableCell className="px-4 py-2 border-b text-center">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="px-4 py-2 border-b text-center">
                        ${item.price.toFixed(2)}
                      </TableCell>
                      {index === 0 && (
                        <TableCell
                          className="px-4 py-2 border-b border text-center"
                          rowSpan={order.items.length}
                        >
                          {order.status}
                        </TableCell>
                      )}
                      {index === 0 && (
                        <TableCell
                          className="px-4 py-2  flex justify-center items-center"
                          rowSpan={order.items.length}
                        >
                          <button
                            title="Edit"
                            className="flex items-center p-2 bg-red-500 text-white rounded-xl"
                            onClick={() => setIsEditing(order)}
                          >
                            <Edit />
                          </button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {isEditing && (
        <EditOrderStatus
          order={isEditing}
          closeModel={() => setIsEditing(null)}
        />
      )}
    </>
  );
};

export default Orders;
