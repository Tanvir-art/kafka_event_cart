const { producer } = require("../config/kafka");
const logger = require("../utils/logger");

const publishPaymentCompleted = async (data) => {
  const eventPayload = {
    service: "payment-service",
    event: "payment_completed",
    ...data,
  };

  await producer.send({
    topic: "payment.completed",
    messages: [
      {
        value: JSON.stringify(eventPayload)
      }
    ]
  });

  logger.info(`Payment success event published for order ${eventPayload.orderId}`);
};

module.exports = { publishPaymentCompleted };
