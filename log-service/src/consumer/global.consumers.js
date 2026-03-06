const { consumer } = require("../config/kafka");
const EventLog = require("../module/eventlog.model");
const logger = require("../utils/logger");

const serviceByTopic = {
  "order.created": "order-service",
  "payment.completed": "payment-service",
  "inventory.events": "inventory-service",
};

const eventByTopic = {
  "order.created": "order_created",
  "payment.completed": "payment_completed",
  "inventory.events": "inventory_event",
};

const startConsumer = async () => {
  await consumer.connect();
  logger.info("Global log consumer connected");

  await consumer.subscribe({
    topic: "order.created",
    fromBeginning: false,
  });

  await consumer.subscribe({
    topic: "payment.completed",
    fromBeginning: false,
  });

  await consumer.subscribe({
    topic: "inventory.events",
    fromBeginning: false,
  });

 
  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      try {
        const rawValue = message.value?.toString() || "{}";
        const data = JSON.parse(rawValue);

        await EventLog.create({
          topic,
          service: data.service || serviceByTopic[topic] || "unknown-service",
          event: data.event || eventByTopic[topic] || "unknown-event",
          payload: data,
        });

        logger.info(`Log stored for topic=${topic}, service=${data.service || serviceByTopic[topic] || "unknown-service"}`);
      } catch (error) {
        logger.error(`Log consumer error on ${topic}: ${error.message}`);
      }
    },
  });
};

module.exports = startConsumer;
