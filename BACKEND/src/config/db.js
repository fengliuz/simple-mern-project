import mongoose from "mongoose";

export const connectDb = async(req,res)=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongo db connect successfuly")
    } catch (error) {
        console.log("error :",error)
    }
}