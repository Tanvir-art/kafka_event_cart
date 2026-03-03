require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const { connectProducer } = require("./config/kafka");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await connectProducer();

    app.listen(PORT, () => {
      console.log(`🚀 Order Service running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server Error:", error);
    process.exit(1);
  }
};

startServer();