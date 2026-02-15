import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    price:Number,
    stock:Number,
    category:String,
    image: [{type:String, required:true}],
    description:String
},{
    timestamps:true
});

export default mongoose.model("Product", productSchema);