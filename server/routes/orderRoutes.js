import express from "express";
import { adminOnly } from "../middleware/adminMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import { createOrder, allOrders, myOrders, updateOrderStatus } from "../controllers/orderController.js";   

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/my-orders", protect, myOrders);
router.get("/", protect, adminOnly, allOrders);
router.put("/:id", protect, adminOnly, updateOrderStatus);

export default router;