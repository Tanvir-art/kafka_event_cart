const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "log-service",
  brokers: [process.env.KAFKA_BROKER],
});

const consumer = kafka.consumer({ groupId: "log-group" });

module.exports = {
  consumer,
};