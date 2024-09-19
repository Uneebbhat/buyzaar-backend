import mongoose from "mongoose";
import { MONGODB_URI } from "./constants";

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI as string);
    console.log(`Database connected: ${conn.connection.host}`);
  } catch (e: any) {
    console.log(`Error connecting to database: ${e.message}`);
  }
};

export default dbConnect;
