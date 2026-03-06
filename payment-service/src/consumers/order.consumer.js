const { consumer, connectConsumer } = require("../config/kafka");
const { processPayment } = require("../modules/payment.service");
const logger = require("../utils/logger");

const startConsumer = async () => {
  await connectConsumer();

  await consumer.subscribe({ topic: "order.created", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const order = JSON.parse(message.value.toString());
      logger.info(`Order received for payment: ${order.orderId}`);

      await processPayment(order);
      logger.info(`Payment processed for order ${order.orderId}`);
    },
  });
};

module.exports = { startConsumer };
