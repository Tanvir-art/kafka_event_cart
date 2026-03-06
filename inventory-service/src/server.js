import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import { startPaymentConsumer } from "./consumers/payment.consumer.js";

dotenv.config();

const startServer = async () => {
  await connectDB();

  await startPaymentConsumer();

  app.listen(5003, () => {
    console.log("Inventory service running on port 5003");
  });
};

startServer();