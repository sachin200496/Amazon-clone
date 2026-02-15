import express from "express";
import { adminOnly } from "../middleware/adminMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import { createOrder,  allOrders,myOrders} from "../controllers/orderController.js";   

export const router = express.Router();

router.post("/", protect, createOrder);
router.get("/my", protect, myOrders);
router.get("/", protect, adminOnly, allOrders);