import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongo = await mongoose.connect(process.env.DB_URI);
    console.log(`MongoDB Connected: ${mongo.connection.host}`);
  } catch (error) {
    //Error Handel
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};