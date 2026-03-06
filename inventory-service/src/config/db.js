import mongoose from "mongoose";
import logger from "../utils/logger.js";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    logger.info("Inventory DB connected");
  } catch (err) {
    logger.error("DB connection error", err);
    process.exit(1);
  }
};

export default connectDB;