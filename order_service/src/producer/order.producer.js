const { producer } = require("../config/kafka");
const logger = require("../utils/logger");

const publishOrderCreated = async (order) => {
  try {
    const eventPayload = {
      service: "order-service",
      event: "order_created",
      orderId: order.orderId,
      userId: order.userId,
      items: order.items,
      amount: order.amount,
      createdAt: order.createdAt,
    };

    await producer.send({
      topic: "order.created",
      messages: [
        {
          key: order.orderId,
          value: JSON.stringify(eventPayload),
        },
      ],
    });
  } catch (error) {
    logger.error(`Kafka publish error: ${error.message}`);
    throw error;
  }
};

module.exports = { publishOrderCreated };
