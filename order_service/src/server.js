require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const { connectProducer } = require("./config/kafka");
const logger = require("./utils/logger");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await connectProducer();

    app.listen(PORT, () => {
      logger.info(`Order service running on port ${PORT}`);
    });
  } catch (error) {
    logger.error(`Order service startup error: ${error.message}`);
    process.exit(1);
  }
};

startServer();
