import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import { startPaymentConsumer } from "./consumers/payment.consumer.js";
import { connectProducer } from "./config/kafka.js";
import logger from "./utils/logger.js";

dotenv.config();

const startServer = async () => {
  try {
    await connectDB();
    await connectProducer();
    await startPaymentConsumer();

    const port = process.env.PORT || 5003;
    app.listen(port, () => {
      logger.info(`Inventory service running on port ${port}`);
    });
  } catch (error) {
    logger.error(`Inventory service startup failed: ${error.message}`);
    process.exit(1);
  }
};

startServer();
