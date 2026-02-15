import Product from "../models/productModel.js";
import { success, error } from "../utils/apiResponse.js";
import cloudinary from "../config/cloudinary.js";

export const createProduct = async (req, res) => {
try{
  if(!req.files || req.files.length === 0){
    return error(res, "No images uploaded", 400);
  }
  const imageUrls = await Promise.all(req.files.map(file => new Promise((resolve,reject)=>{
    cloudinary.uploader.upload_stream({folder:"amazon-clone/products",resource_type:"image"},
        (error,result) =>{ if(error) return reject(error); resolve(result.secure_url)}).end(file.buffer);
  })))

  const product = await Product.create({...req.body, images: imageUrls});
  success(res, product);
}
catch(err){
    error(res, err.message, 500);
}
}

export const getProducts = async (req, res) => {
    const products = await Product.find();
    success(res, products); 
}

export const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product){
        success(res, product); 
    }else{
        error(res, "Product not found", 404);
    } }

export const updateProduct = async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true});
    if(product){
        success(res, product);}
    else{
        error(res, "Product not found", 404);  }

    }

export const deleteProduct = async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id); 
    if(product){
        success(res, product); 
    }else{
        error(res, "Product not found", 404);
    }}