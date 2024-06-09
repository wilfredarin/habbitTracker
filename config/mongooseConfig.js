import mongoose from "mongoose"

export const connectToDb = async()=>{
    await mongoose.connect(`${process.env.DB_URL}`);
    console.log("Connected to MongoDB")
}