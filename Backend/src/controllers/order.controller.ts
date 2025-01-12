import { Response, Request } from "express";
import Order from "../models/order.schema";
import { emitMessageToGroup } from "../socket";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { items } = req.body;

    const newOrder = await Order.create({
      items,
      status: "processing",
    });

    // await newOrder.save();
    console.log(newOrder);
    return res.status(201).json(newOrder);
  } catch (error) {
    console.log("errir in create order", error);
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId, status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    emitMessageToGroup("12345", "order-processsing", "this is ");
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getOrderByStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.params;

    const orders = await Order.find({ status });

    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found with this status" });
    }

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
