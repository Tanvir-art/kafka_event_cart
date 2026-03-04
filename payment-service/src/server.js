require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const { startConsumer } = require("./consumers/order.consumer");
const { connectProducer } = require("./config/kafka");

const PORT = process.env.PORT || 5002;

const startServer = async () => {
  await connectDB();
  await connectProducer();
  await startConsumer();

  app.listen(PORT, () => {
    console.log(`🚀 Payment Service running on port ${PORT}`);
  });
};

startServer();