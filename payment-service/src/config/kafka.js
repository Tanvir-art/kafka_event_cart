const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "payment-service",
  brokers: [process.env.KAFKA_BROKER],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "payment-group" });

const connectProducer = async () => {
  await producer.connect();
  console.log("Kafka Producer Connected");
};

const connectConsumer = async () => {
  await consumer.connect();
  console.log("Kafka Consumer Connected");
};

module.exports = { producer, consumer, connectProducer, connectConsumer };
