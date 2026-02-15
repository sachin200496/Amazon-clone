import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
      user:{type: mongoose.Schema.Types.ObjectId,ref:"User"},
      items:[],
      total:Number,
      status:{type:String,default:"Pending"}
    },{
        timestamps:true
    }
);


export default mongoose.model("Order",orderSchema);