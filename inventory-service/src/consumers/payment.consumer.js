import { consumer } from "../config/kafka.js";
import { reduceStock } from "../modules/inventory.service.js";
import logger from "../utils/logger.js";

export const startPaymentConsumer = async () => {
  await consumer.connect();
  console.log("Payment consumer connected");
  await consumer.subscribe({
    topic: "payment.completed",
    fromBeginning: true
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      console.log("Received payment completed message:", message);
      try {
        const data = JSON.parse(message.value.toString());
        console.log("Received payment completed message:", data); 
        const { productId, quantity } = data;

        await reduceStock(productId, quantity);

        logger.info("Inventory updated after payment");
      } catch (err) {
        logger.error("Inventory update failed", err);
      }
    }
  });
};