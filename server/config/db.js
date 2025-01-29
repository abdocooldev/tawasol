import mongoose from "mongoose";
import config from "config";

const db = config.get("mongoConnectionString");

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("Connected to Database Successfully.");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
