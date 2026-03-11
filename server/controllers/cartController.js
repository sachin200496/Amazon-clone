import Cart from "../models/cart.js";
import Product from "../models/product.js";
import { success, error } from "../utils/apiResponse.js";

export const addToCart = async (req, res) => {
    try {
        console.log("\n========== ADD TO CART DEBUG ==========");
        const { productId, quantity } = req.body;
        const userId = req.user._id;

        // Validate input
        if (!productId || !quantity || quantity < 1) {
            return error(res, "Product ID and valid quantity are required", 400);
        }

        console.log("👤 User ID:", userId);
        console.log("📦 Product ID:", productId);
        console.log("🔢 Quantity:", quantity);

        // Get product details for price
        const product = await Product.findById(productId);
        if (!product) {
            return error(res, "Product not found", 404);
        }

        console.log("💰 Product Price:", product.price);

        // Find or create cart
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            // Create new cart
            cart = await Cart.create({
                user: userId,
                items: [
                    {
                        product: productId,
                        quantity,
                        price: product.price
                    }
                ]
            });
            console.log("✅ New cart created");
        } else {
            // Check if product already in cart
            const existingItemIndex = cart.items.findIndex(
                item => item.product.toString() === productId
            );

            if (existingItemIndex !== -1) {
                // Update quantity
                cart.items[existingItemIndex].quantity += quantity;
                console.log("📝 Updated quantity for existing product");
            } else {
                // Add new item
                cart.items.push({
                    product: productId,
                    quantity,
                    price: product.price
                });
                console.log("➕ Added new product to cart");
            }
            await cart.save();
        }

        // Populate and return cart
        await cart.populate("items.product", "name price image category");
        console.log("✅ Cart updated successfully");
        console.log("========================================\n");

        return success(res, cart, "Product added to cart successfully");
    } catch (err) {
        console.error("❌ Add to cart error:", err.message);
        console.log("========================================\n");
        return error(res, err.message, 500);
    }
};

export const getCart = async (req, res) => {
    try {
        console.log("\n========== GET CART DEBUG ==========");
        const userId = req.user._id;

        const cart = await Cart.findOne({ user: userId }).populate(
            "items.product",
            "name price image category stock"
        );

        if (!cart) {
            console.log("ℹ️ Cart is empty (not created yet)");
            console.log("==================================\n");
            return success(res, { items: [], totalPrice: 0 }, "Cart is empty");
        }

        console.log("📦 Cart items:", cart.items.length);
        console.log("💰 Total price:", cart.totalPrice);
        console.log("==================================\n");

        return success(res, cart, "Cart retrieved successfully");
    } catch (err) {
        console.error("❌ Get cart error:", err.message);
        console.log("==================================\n");
        return error(res, err.message, 500);
    }
};

export const updateCartItem = async (req, res) => {
    try {
        console.log("\n========== UPDATE CART ITEM DEBUG ==========");
        const { productId, quantity } = req.body;
        const userId = req.user._id;

        // Validate input
        if (!productId || !quantity) {
            return error(res, "Product ID and quantity are required", 400);
        }

        if (quantity < 0) {
            return error(res, "Quantity cannot be negative", 400);
        }

        console.log("👤 User ID:", userId);
        console.log("📦 Product ID:", productId);
        console.log("🔢 New Quantity:", quantity);

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return error(res, "Cart not found", 404);
        }

        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );

        if (itemIndex === -1) {
            return error(res, "Product not in cart", 404);
        }

        if (quantity === 0) {
            // Remove item from cart
            cart.items.splice(itemIndex, 1);
            console.log("🗑️ Item removed from cart");
        } else {
            // Update quantity
            cart.items[itemIndex].quantity = quantity;
            console.log("📝 Quantity updated");
        }

        await cart.save();

        await cart.populate("items.product", "name price image category");
        console.log("✅ Cart item updated successfully");
        console.log("==========================================\n");

        return success(res, cart, "Cart item updated successfully");
    } catch (err) {
        console.error("❌ Update cart item error:", err.message);
        console.log("==========================================\n");
        return error(res, err.message, 500);
    }
};

export const removeFromCart = async (req, res) => {
    try {
        console.log("\n========== REMOVE FROM CART DEBUG ==========");
        const { productId } = req.body;
        const userId = req.user._id;

        if (!productId) {
            return error(res, "Product ID is required", 400);
        }

        console.log("👤 User ID:", userId);
        console.log("📦 Product ID:", productId);

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return error(res, "Cart not found", 404);
        }

        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );

        if (itemIndex === -1) {
            return error(res, "Product not in cart", 404);
        }

        cart.items.splice(itemIndex, 1);
        console.log("🗑️ Item removed from cart");

        await cart.save();

        await cart.populate("items.product", "name price image category");
        console.log("✅ Item removed successfully");
        console.log("===========================================\n");

        return success(res, cart, "Item removed from cart successfully");
    } catch (err) {
        console.error("❌ Remove from cart error:", err.message);
        console.log("===========================================\n");
        return error(res, err.message, 500);
    }
};

export const clearCart = async (req, res) => {
    try {
        console.log("\n========== CLEAR CART DEBUG ==========");
        const userId = req.user._id;

        console.log("👤 User ID:", userId);

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return error(res, "Cart not found", 404);
        }

        const itemCount = cart.items.length;
        cart.items = [];
        cart.totalPrice = 0;

        await cart.save();

        console.log(`🗑️ Cleared ${itemCount} items from cart`);
        console.log("=====================================\n");

        return success(res, cart, "Cart cleared successfully");
    } catch (err) {
        console.error("❌ Clear cart error:", err.message);
        console.log("=====================================\n");
        return error(res, err.message, 500);
    }
};