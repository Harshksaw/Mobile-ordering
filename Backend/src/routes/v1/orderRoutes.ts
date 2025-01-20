import express from "express";
import {
  createOrder,
  getAllOrders,
  updateOrderStatus,
} from "../../controllers/order.controller";

const router = express.Router();

router.post("/createOrder", createOrder as any);
router.post("/updateOrderStatus", updateOrderStatus as any);
router.get("/getAllOrder", getAllOrders as any);
export default router;
