const { Kafka } = require("kafkajs");

console.log("Kafka Broker:", process.env.KAFKA_BROKER)

const kafka = new Kafka({
  clientId: "order-service",
  brokers: [process.env.KAFKA_BROKER],
});

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
  console.log(" Kafka Producer Connected");
};

module.exports = { producer, connectProducer };

