require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const startConsumer = require("./consumer/global.consumers");
const logger = require("./utils/logger");

const PORT = process.env.PORT || 5005;

const startServer = async () => {
  try {
    await connectDB();
    await startConsumer();

    app.listen(PORT, () => {
      logger.info(`Log service running on port ${PORT}`);
    });
  } catch (error) {
    logger.error(`Log service startup failed: ${error.message}`);
    process.exit(1);
  }
};

startServer();
