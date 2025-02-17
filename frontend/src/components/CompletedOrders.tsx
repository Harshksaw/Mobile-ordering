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

interface OrderItem {
  item: string;
  name: string;
  size: string;
  price: number;
  _id: string;
}

interface Order {
  _id: string;
  items: {
    _id: string;
    item: OrderItem;
    size: string;
    price: number;
  }[];
  status: string;
  createdAt: string;
  updatedAt: string;
  token: number;
}

const CompletedOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const ordersRef = React.useRef<Order[]>([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  // const tokenMap = new Map<number, number>();

  useEffect(() => {
    const socket = io(`${BASE_URL}`);

    socket.on("connect", () => {
      console.log("Connected to socket server");
      // socket.emit("joinGroup", "12345");
    });

    socket.on("order-completed", (data) => {
      console.log(" order completed", data);
      // ordersRef.current = [...ordersRef.current, data];
      if (data.status === "completed") {
        ordersRef.current = [data, ...ordersRef.current];
        setOrders([...ordersRef.current]);
        toast.success("New order added");
      }
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
      const res = await axios.get(
        `${BASE_URL}/api/v1/order/getOrderByStatus/completed`
      );
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
    // orders.forEach((row, index) => {
    //   if (!tokenMap.has(row.token)) {
    //     tokenMap.set(row.token, index);
    //   }
    // });
  }, [BASE_URL]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
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
                size
              </TableHead>
              <TableHead className="px-4 py-2 border-b text-center font-bold text-black">
                price
              </TableHead>
              <TableHead className="px-4 py-2 border-b text-center font-bold text-black">
                Status
              </TableHead>
              {/* <TableHead className="px-4 py-2 font-bold text-center text-black">
                Update Status
              </TableHead> */}
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
                      {item.item.name}
                    </TableCell>
                    <TableCell className="px-4 py-2 border-b text-center">
                      {item.size}
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
                    {/* {index === 0 && (
                      <TableCell className="px-4 py-2  flex justify-center items-center">
                        <Edit />
                      </TableCell>
                    )} */}
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CompletedOrders;
