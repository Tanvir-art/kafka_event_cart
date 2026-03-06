import dotenv from "dotenv";
dotenv.config();
import { Kafka } from "kafkajs";
import logger from "../utils/logger.js";

const kafka = new Kafka({
  clientId: "inventory-service",
  brokers: [process.env.KAFKA_BROKER]
});

const producer = kafka.producer();
export const consumer = kafka.consumer({
  groupId: "inventory-group"
});

let isProducerConnected = false;

export const connectProducer = async () => {
  if (isProducerConnected) {
    return;
  }

  await producer.connect();
  isProducerConnected = true;
  logger.info(`Kafka producer connected (${process.env.KAFKA_BROKER})`);
};

export { producer };
