import mongoose from "mongoose";

async function connectDB() {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/swipe-app";
  await mongoose.connect(uri);
  console.log("MongoDB connected");
}


export default connectDB;