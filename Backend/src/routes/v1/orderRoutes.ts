import express from "express";
import {
  createOrder,
  getOrderByStatus,
  getOrders,
  updateOrderStatus,
} from "../../controllers/order.controller";

const router = express.Router();

router.post("/createOrder", createOrder as any);
router.post("/updateOrderStatus", updateOrderStatus as any);
router.get("/getOrderByStatus/:status", getOrderByStatus as any);
router.get("/getAllOrder", getOrders as any);
export default router;
