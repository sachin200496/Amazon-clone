import Product from "../models/productModel.js";
import { success, error } from "../utils/apiResponse.js";
import cloudinary from "../config/cloudinary.js";

export const createProduct = async (req, res) => {

    if(req.files && req.files.length > 0) {
        const uploadPromises = req.files.map(file => cloudinary.uploader.upload_stream({ resource_type: "auto" }, (err, result) => {
            if (err) {
                return error(res, err.message, 500);
            }
            req.body.image = [...(req.body.image || []), result.secure_url];
        }));
        Promise.all(uploadPromises).then(() => {
            Product.create(req.body)
                .then(product => success(res, product))
                .catch(err => error(res, err.message, 500));
        });
    } else {
        Product.create(req.body)
            .then(product => success(res, product))
            .catch(err => error(res, err.message, 500));
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