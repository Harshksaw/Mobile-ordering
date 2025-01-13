import express from "express";
import {
  createOrder,
  updateOrderStatus,
} from "../../controllers/order.controller";

const router = express.Router();

router.post("/createOrder", createOrder as any);
router.post("/updateOrderStatus", updateOrderStatus as any);
export default router;
