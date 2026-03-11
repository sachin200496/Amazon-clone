import dotenv from "dotenv";

// ✅ MUST be first thing - before any imports that use process.env
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoutes.js";
import productRoute from "./routes/productRoutes.js";
import cartRoute from "./routes/cartRoutes.js";
import orderRoute from "./routes/orderRoutes.js";
import { error } from "./middleware/errorMiddleware.js";
import connectDb from "./config/db.js";

const app = express();

// ✅ CORS first (for credentials)
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));

// ✅ Cookie parser (parses incoming cookies)
app.use(cookieParser());

// ✅ Express JSON (parse request bodies BEFORE routes)
app.use(express.json());

// ✅ ROUTES (now have access to req.body and req.cookies)
connectDb();
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);

// Error handling middleware (MUST be last, with 4 parameters)
app.use(error);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port `);
    connectDB();
}   );