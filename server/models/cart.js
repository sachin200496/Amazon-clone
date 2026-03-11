import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                    default: 1
                },
                price: {
                    type: Number
                }
            }
        ],
        totalPrice: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

// Calculate total price before saving
cartSchema.pre("save", function (next) {
    this.totalPrice = this.items.reduce((sum, item) => {
        return sum + (item.price * item.quantity || 0);
    }, 0);
    next();
});

export default mongoose.model("Cart", cartSchema);