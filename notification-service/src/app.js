const listenPaymentEvents = require("./consumers/payment.consumer");

const startApp = async () => {
  try {
    await listenPaymentEvents();
    console.log("Notification service listening to Kafka events...");
  } catch (err) {
    console.error("Failed to start notification service", err);
  }
};

module.exports = startApp;