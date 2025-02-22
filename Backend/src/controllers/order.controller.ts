import { Response, Request } from "express";
import { Order } from "../models/order.schema";
import { BroadCastMessageToAdmin } from "../socket";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const {
      clientId,
      items,
      totalAmount,
      customerName,
      customerPhone,
      status = "pending",
    } = req.body;

    // Create new order
    const order = new Order({
      clientId,
      items: items.map((item: any) => ({
        item: item.item,
        quantity: item.quantity,
        price: item.price,
        name: item.name,
      })),
      totalAmount,
      customerName,
      customerPhone,
      status,
    });

    // Save the order
    const savedOrder = await order.save();
    // emit message to group
    // emitMessageToGroup("12345", "new-order", savedOrder);
    // broadcast message to all admins
    BroadCastMessageToAdmin("new-order", savedOrder);

    res.status(201).json({
      success: true,
      data: savedOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to create order",
    });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id, status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      {
        _id: id,
      },
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (status === "completed") {
      // socket -id
      // emitMessageToGroup("12345", "order-updated", updatedOrder);
      BroadCastMessageToAdmin("order-completed", updatedOrder);
    }
    if (status === "processing")
      BroadCastMessageToAdmin("order-processing", updatedOrder);

    status === "cancelled" &&
      BroadCastMessageToAdmin("order-cancelled", updatedOrder);
    status === "pending" &&
      BroadCastMessageToAdmin("order-pending", updatedOrder);

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
    // .populate({
    //   path: "items.item",
    //   select: "name _id",
    // });

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

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch orders",
    });
  }
};
