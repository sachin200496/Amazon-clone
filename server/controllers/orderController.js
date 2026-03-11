import Order from "../models/order.js";
import Product from "../models/product.js";
import { success, error } from "../utils/apiResponse.js";

export const createOrder = async (req, res) => {
  try {
    console.log("\n========== CREATE ORDER DEBUG ==========");
    console.log("👤 User:", req.user._id);
    console.log("📦 Frontend Sent Order Data:", req.body);

    const { orderItems, shippingAddress } = req.body;

    // Validate order data
    if (!orderItems || orderItems.length === 0) {
      return error(res, "Order must contain at least one item", 400);
    }

    if (!shippingAddress) {
      return error(res, "Shipping address is required", 400);
    }

    console.log("🔐 Validating items against database...");

    // ✅ SECURITY: Validate each item and recalculate total from database prices
    let calculatedTotal = 0;
    const validatedItems = [];

    for (const item of orderItems) {
      const { product: productId, quantity } = item;

      // Validate quantity
      if (!quantity || quantity < 1) {
        return error(res, "Invalid quantity for product", 400);
      }

      // Fetch product from database
      const product = await Product.findById(productId);
      if (!product) {
        return error(res, `Product not found: ${productId}`, 404);
      }

      console.log(`   📦 Product: ${product.name}`);
      console.log(`      Requested qty: ${quantity}`);
      console.log(`      DB Price: ${product.price}`);

      // Check stock
      if (product.stock < quantity) {
        return error(
          res,
          `Insufficient stock for ${product.name}. Available: ${product.stock}, Requested: ${quantity}`,
          400
        );
      }

      // Use DATABASE price, not frontend price (security!)
      const itemTotal = product.price * quantity;
      calculatedTotal += itemTotal;

      console.log(`      Item Total: ${itemTotal}`);

      validatedItems.push({
        product: productId,
        quantity,
        price: product.price  // ← From database, not frontend!
      });
    }

    console.log(`\n💰 Frontend sent total: ${req.body.total || "not provided"}`);
    console.log(`💰 Calculated total from DB: ${calculatedTotal}`);

    // ✅ SECURITY: Verify total matches
    if (req.body.total && req.body.total !== calculatedTotal) {
      console.warn("⚠️ SECURITY WARNING: Frontend sent different total!");
      console.warn(`   Frontend total: ${req.body.total}`);
      console.warn(`   Database total: ${calculatedTotal}`);
      console.warn("   Using database total for security");
    }

    // Create order with validated data
    const orderData = {
      user: req.user._id,
      orderItems: validatedItems,
      total: calculatedTotal,  // ← Use calculated total, not frontend total!
      shippingAddress,
      status: "Pending"
    };

    const order = await Order.create(orderData);
    console.log("\n✅ Order created successfully:", order._id);
    console.log("========================================\n");

    return success(res, order, "Order created successfully");
  } catch (err) {
    console.error("❌ Create order error:", err.message);
    console.log("========================================\n");
    return error(res, err.message, 500);
  }
};


export const myOrders = async (req, res) => {
  try {
    console.log("\n========== GET MY ORDERS DEBUG ==========");
    console.log("👤 User ID:", req.user._id);

    const orders = await Order.find({ user: req.user._id })
      .populate("user", "name email")
      .populate("orderItems.product", "name price image category");

    console.log("✅ Found", orders.length, "orders");
    console.log("========================================\n");

    return success(res, orders, "Orders retrieved successfully");
  } catch (err) {
    console.error("❌ Get my orders error:", err.message);
    console.log("========================================\n");
    return error(res, err.message, 500);
  }
};

export const allOrders = async (req, res) => {
  try {
    console.log("\n========== GET ALL ORDERS (ADMIN) ==========");

    const orders = await Order.find()
      .populate("user", "name email")
      .populate("orderItems.product", "name price image category");

    console.log("✅ Found", orders.length, "total orders");
    console.log("=========================================\n");

    return success(res, orders, "All orders retrieved successfully");
  } catch (err) {
    console.error("❌ Get all orders error:", err.message);
    console.log("=========================================\n");
    return error(res, err.message, 500);
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    console.log("\n========== UPDATE ORDER STATUS ==========");
    console.log("📦 Order ID:", req.params.id);
    console.log("📊 New Status:", req.body.status);

    const { status } = req.body;

    if (!status) {
      return error(res, "Status is required", 400);
    }

    const validStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return error(res, `Invalid status. Must be one of: ${validStatuses.join(", ")}`, 400);
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("user", "name email").populate("orderItems.product", "name price");

    if (!order) {
      return error(res, "Order not found", 404);
    }

    console.log("✅ Order status updated:", order._id);
    console.log("==========================================\n");

    return success(res, order, "Order status updated successfully");
  } catch (err) {
    console.error("❌ Update order status error:", err.message);
    console.log("==========================================\n");
    return error(res, err.message, 500);
  }
};