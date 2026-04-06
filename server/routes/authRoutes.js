import express from "express";
import { 
  login, 
  register, 
  logout,
  getCurrentUser,
  makeUserAdmin, 
  revokeUserAdmin, 
  getAllUsers, 
  getAuditLogs 
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/me", protect, getCurrentUser);
router.post("/logout", protect, logout);

// Admin-only routes (require authentication + admin role)
router.put("/make-admin", protect, adminOnly, makeUserAdmin);
router.put("/revoke-admin", protect, adminOnly, revokeUserAdmin);
router.get("/users", protect, adminOnly, getAllUsers);
router.get("/audit-logs", protect, adminOnly, getAuditLogs);

export default router;