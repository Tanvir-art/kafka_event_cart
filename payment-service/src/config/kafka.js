const { Kafka } = require("kafkajs");
const logger = require("../utils/logger");

const kafka = new Kafka({
  clientId: "payment-service",
  brokers: [process.env.KAFKA_BROKER],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "payment-group" });

const connectProducer = async () => {
  await producer.connect();
  logger.info("Kafka producer connected");
};

const connectConsumer = async () => {
  await consumer.connect();
  logger.info("Kafka consumer connected");
};

module.exports = { producer, consumer, connectProducer, connectConsumer };
