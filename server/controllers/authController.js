import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";
import { success, error } from "../utils/apiResponse.js";
import bcrypt from "bcrypt";
import setTokenCookie from "../utils/tokenCookie.js";
import AuditLog from "../models/auditLog.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return error(res, "All fields are required", 400);
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return error(res, "User already exists", 400);
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    if (user) {
      const token = generateToken(user._id, user.isAdmin);
      setTokenCookie(res, token);
      console.log(`✅ User registered successfully: ${email}`);
      return success(res, {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: token, // ← Return token in response
      }, "User registered successfully");
    }
    return error(res, "Unable to create user", 500);
  } catch (err) {
    console.error("❌ Register error:", err.message);
    return error(res, err.message || "Server error", 500);
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && ( await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id, user.isAdmin);
      setTokenCookie(res, token);
      console.log(`✅ User logged in successfully: ${email}`);
      return success(res, {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: token, // ← Return token in response
      }, "Login successful");
    } else {
      return error(res, "Invalid email or password", 401);
    }
  } catch (err) {
    console.error("❌ Login error:", err.message);
    return error(res, err.message || "Server error", 500);
  }
};

// Make a user admin (admin-only operation)
export const makeUserAdmin = async (req, res) => {
  try {
    const { userId } = req.body;
    const adminId = req.user.id; // Current admin making the change

    // Validation
    if (!userId) {
      return error(res, "User ID is required", 400);
    }

    if (userId === adminId) {
      return error(res, "Cannot modify your own admin status", 400);
    }

    // Find target user
    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return error(res, "User not found", 404);
    }

    // Check if already admin
    if (targetUser.isAdmin) {
      return error(res, "User is already an admin", 400);
    }

    // Update user
    targetUser.isAdmin = true;
    await targetUser.save();

    // Log to audit trail
    await AuditLog.create({
      action: "MAKE_ADMIN",
      targetUserId: userId,
      targetUserEmail: targetUser.email,
      performedBy: adminId,
      performedByEmail: req.user.email,
      details: `Made user ${targetUser.email} an admin`,
      timestamp: new Date(),
    });

    console.log(`[AUDIT] ${req.user.email} made ${targetUser.email} an admin`);

    return success(res, {
      _id: targetUser._id,
      name: targetUser.name,
      email: targetUser.email,
      isAdmin: targetUser.isAdmin,
    }, "User is now an admin");
  } catch (err) {
    return error(res, err.message || "Server error", 500);
  }
};

// Revoke admin privileges (admin-only operation)
export const revokeUserAdmin = async (req, res) => {
  try {
    const { userId } = req.body;
    const adminId = req.user.id;

    // Validation
    if (!userId) {
      return error(res, "User ID is required", 400);
    }

    if (userId === adminId) {
      return error(res, "Cannot revoke your own admin status", 400);
    }

    // Find target user
    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return error(res, "User not found", 404);
    }

    // Check if already not admin
    if (!targetUser.isAdmin) {
      return error(res, "User is not an admin", 400);
    }

    // Update user
    targetUser.isAdmin = false;
    await targetUser.save();

    // Log to audit trail
    await AuditLog.create({
      action: "REVOKE_ADMIN",
      targetUserId: userId,
      targetUserEmail: targetUser.email,
      performedBy: adminId,
      performedByEmail: req.user.email,
      details: `Revoked admin privileges from ${targetUser.email}`,
      timestamp: new Date(),
    });

    console.log(`[AUDIT] ${req.user.email} revoked admin from ${targetUser.email}`);

    return success(res, {
      _id: targetUser._id,
      name: targetUser.name,
      email: targetUser.email,
      isAdmin: targetUser.isAdmin,
    }, "Admin privileges revoked");
  } catch (err) {
    return error(res, err.message || "Server error", 500);
  }
};

// Get all users (admin-only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude passwords
    return success(res, users, "Users retrieved successfully");
  } catch (err) {
    return error(res, err.message || "Server error", 500);
  }
};

// Get audit logs (admin-only)
export const getAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find({})
      .sort({ timestamp: -1 })
      .limit(100); // Last 100 logs
    return success(res, logs, "Audit logs retrieved successfully");
  } catch (err) {
    return error(res, err.message || "Server error", 500);
  }
};

// Logout user
export const logout = async (req, res) => {
  try {
    const userId = req.user?.id;
    const userEmail = req.user?.email;

    // Clear the token cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // Log logout action for audit trail (optional - only if user is authenticated)
    if (userId && userEmail) {
      await AuditLog.create({
        action: "LOGOUT",
        performedBy: userId,
        performedByEmail: userEmail,
        details: `User ${userEmail} logged out`,
        timestamp: new Date(),
        status: "SUCCESS",
      });

      console.log(`[AUDIT] User logged out: ${userEmail}`);
    }

    return success(res, null, "Logged out successfully");
  } catch (err) {
    return error(res, err.message || "Server error", 500);
  }
};