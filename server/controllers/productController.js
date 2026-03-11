import Product from "../models/product.js";
import { success, error } from "../utils/apiResponse.js";
import cloudinary from "../config/cloudinary.js";

export const createProduct = async (req, res) => {
  try {
    console.log("\n========== CREATE PRODUCT DEBUG ==========");
    console.log("� User Info:", {
      userId: req.user?.id,
      userEmail: req.user?.email,
      isAdmin: req.user?.isAdmin
    });
    
    console.log("� Request Body:", req.body);
    console.log("� Files Info:", {
      hasFiles: !!req.files,
      fileCount: req.files?.length || 0,
      fields: req.files?.map(f => ({
        fieldname: f.fieldname,
        originalname: f.originalname,
        size: f.size,
        mimetype: f.mimetype
      }))
    });
    
  
    
    console.log(`✅ Processing ${req.files.length} images...`);
    
    // Upload images to Cloudinary
    const imageUrls = await Promise.all(req.files.map(file => new Promise((resolve, reject) => {
      console.log(`   📤 Uploading: ${file.originalname}`);
      cloudinary.uploader.upload_stream(
        { folder: "amazon-clone/products", resource_type: "image" },
        (error, result) => {
          if (error) {
            console.error(`   ❌ Cloudinary error: ${error.message}`);
            return reject(error);
          }
          console.log(`   ✅ Uploaded: ${result.secure_url}`);
          resolve(result.secure_url);
          return result.secure_url;
        }
      ).end(file.buffer);
    })));
console.log("� Image URLs:", imageUrls);
    console.log("☁️ All images uploaded to Cloudinary");

    // Create product with images
    const product = await Product.create({ ...req.body, image: imageUrls });
    console.log("✅ Product created in database:", product._id);
    console.log("========================================\n");
    
    return success(res, product, "Product created successfully");
  } catch (err) {
    console.error("❌ Create product error:", err.message);
    console.error("Stack:", err.stack);
    return error(res, err.message, 500);
  }
}

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return success(res, products, "Products retrieved successfully");
  } catch (err) {
    console.error("❌ Get products error:", err.message);
    return error(res, err.message, 500);
  }
}

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return success(res, product, "Product retrieved successfully");
    } else {
      return error(res, "Product not found", 404);
    }
  } catch (err) {
    console.error("❌ Get product by ID error:", err.message);
    return error(res, err.message, 500);
  }
}

export const updateProduct = async (req, res) => {
  try {
    console.log("\n========== UPDATE PRODUCT DEBUG ==========");
    console.log("📋 Request Body:", req.body);
    console.log("📸 Files Info:", {
      hasFiles: !!req.files,
      fileCount: req.files?.length || 0
    });

    let updateData = { ...req.body };

    // If images are provided, upload them to Cloudinary
    if (req.files && req.files.length > 0) {
      console.log(`✅ Processing ${req.files.length} new images...`);
      
      const imageUrls = await Promise.all(req.files.map(file => new Promise((resolve, reject) => {
        console.log(`   📤 Uploading: ${file.originalname}`);
        cloudinary.uploader.upload_stream(
          { 
            resource_type: "image",
            folder: "amazon-clone/products" 
          }, 
          (error, result) => {
            if (error) {
              console.error(`   ❌ Cloudinary error: ${error.message}`);
              return reject(error);
            }
            console.log(`   ✅ Uploaded: ${result.secure_url}`);
            resolve(result.secure_url);
          }
        ).end(file.buffer);
      })));

      console.log("☁️ All new images uploaded to Cloudinary");
      updateData.image = imageUrls;
    }

    // Update product with new data (and new images if provided)
    const product = await Product.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true, runValidators: true }
    );

    if (product) {
      console.log("✅ Product updated:", product._id);
      console.log("========================================\n");
      return success(res, product, "Product updated successfully");
    } else {
      console.log("❌ Product not found:", req.params.id);
      console.log("========================================\n");
      return error(res, "Product not found", 404);
    }
  } catch (err) {
    console.error("❌ Update product error:", err.message);
    console.error("Stack:", err.stack);
    console.log("========================================\n");
    return error(res, err.message, 500);
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
      console.log("✅ Product deleted:", product._id);
      return success(res, product, "Product deleted successfully");
    } else {
      return error(res, "Product not found", 404);
    }
  } catch (err) {
    console.error("❌ Delete product error:", err.message);
    return error(res, err.message, 500);
  }
}