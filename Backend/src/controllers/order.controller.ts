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
    const order = await newOrder.populate({
      path: "items.item",
      select: "name _id",
    });
    //  to send message to all connected clients
    // getAllOrders();
    emitMessageToGroup("12345", "order-created", order);
    return res.status(201).json({
      succees: true,
      message: "order created successfully",
      newOrder,
    });
  } catch (error) {
    console.log("error in create order", error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
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
    emitMessageToGroup("12345", "order-processsing", "this is order");
    res.status(200).json({
      success: true,
      message: "updated order status",

      updatedOrder,
    });
  } catch (error) {
    console.log("error in update order status", error);
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

    res.status(200).json({
      success: true,
      message: "order feteched by status",
      orders,
    });
  } catch (error) {
    console.log("error in get orderby status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "items.item",
        select: "name _id",
      })
      .sort({ createdAt: -1 });
    // emitMessageToGroup("12345", "get-all-orders", orders);

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log("error in get all orders", error);
    // res.status(500).json({ message: (error as Error).message });
  }
};
