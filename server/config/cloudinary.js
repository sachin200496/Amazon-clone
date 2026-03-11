import{ v2 as cloudinary }from "cloudinary";
import dotenv from "dotenv";

// ✅ Load environment variables (must be before any use of process.env)
dotenv.config();

console.log("🔐 Loading Cloudinary Config...");
console.log("   CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("   CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY ? "✅ Loaded" : "❌ Missing");
console.log("   CLOUDINARY_API_SECRET:", process.env.CLOUDINARY_API_SECRET ? "✅ Loaded" : "❌ Missing");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export default cloudinary;