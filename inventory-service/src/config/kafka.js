import dotenv from "dotenv";
dotenv.config()
import { Kafka } from "kafkajs";

console.log("Kafka Broker:", process.env.KAFKA_BROKER);

const kafka = new Kafka({
  clientId: "inventory-service",
  brokers: [process.env.KAFKA_BROKER]
});

export const consumer = kafka.consumer({
  groupId: "inventory-group"
});