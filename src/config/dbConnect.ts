import mongoose from "mongoose";
import { MONGODB_URI } from "./constants";

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI as string, {
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
    });
    console.log(`Database connected: ${conn.connection.host}`);
  } catch (e: any) {
    console.error(`Error connecting to database: ${e.message}`);
  }
};

export default dbConnect;
