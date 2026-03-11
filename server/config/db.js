
import mongoose from "mongoose";

const connectDb = async()=>{
    await mongoose.connect(process.env.MONGODB_URI,{autoSelectFamily:false
    }
    );
    console.log("MongoDb connected")
};

export default connectDb