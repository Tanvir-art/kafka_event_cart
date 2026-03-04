const { consumer, connectConsumer } = require("../config/kafka");
const { processPayment } = require("../modules/payment.service");

const startConsumer = async () => {
  await connectConsumer();

  await consumer.subscribe({ topic: "order.created", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const order = JSON.parse(message.value.toString());
      console.log(" Received Order:", order);

      await processPayment(order);
      console.log(" Payment processed for Order:", order.orderId);
    },
  });
};

module.exports = { startConsumer };