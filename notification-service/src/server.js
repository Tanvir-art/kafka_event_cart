require("dotenv").config();
const startApp = require("./app");

console.log("Starting Notification Service...", process.env.KAFKA_BROKER, process.env.PORT);

const PORT = process.env.PORT || 4000;

startApp().then(() => {
  console.log(`Notification Service running on port ${PORT}`);
});