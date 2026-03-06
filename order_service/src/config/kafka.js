const { Kafka } = require("kafkajs");
const logger = require("../utils/logger");

const kafka = new Kafka({
  clientId: "order-service",
  brokers: [process.env.KAFKA_BROKER],
});

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
  logger.info("Kafka producer connected");
};

module.exports = { producer, connectProducer };
