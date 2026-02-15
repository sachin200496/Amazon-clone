import Cart from "../models/cart.js";

export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
        cart = await Cart.create({ user: req.user._id, items: [{ product: productId, quantity }] });
    } else {
        const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (existingItemIndex !== -1) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }
        await cart.save();
    }

}


export const getCart = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product", "name price");
    res.json(cart);
}