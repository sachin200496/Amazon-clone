import mongoose from "mongoose";

const userSchmema = new mongoose.Schema({
    name: String,
    email:{type:String, unique:true},
    password:String,
    isAdmin:{type:Boolean,default:false}
},{
    timestamps:true
});

export default mongoose.model("User", userSchmema);