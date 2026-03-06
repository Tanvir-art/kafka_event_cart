const { consumer } = require("../config/kafka");
const NotificationService = require("../modules/notification-service");
const logger = require("../utils/logger");

const listenPaymentEvents = async () => {
  await consumer.connect();  
  await consumer.subscribe({ topic: "payment.completed", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        console.log(" topic, partition: ",  topic, partition);
      const event = JSON.parse(message.value.toString());
      console.log("Received event: ", event);
      
      logger.info(`Received event for order ${event.orderId}`);

      if (event.type === "payment-success") {
        await NotificationService.sendPaymentSuccessNotification(event);
      } else if (event.type === "payment-failure") {
        await NotificationService.sendPaymentFailureNotification(event);
      }
    },
  });
};

module.exports = listenPaymentEvents;