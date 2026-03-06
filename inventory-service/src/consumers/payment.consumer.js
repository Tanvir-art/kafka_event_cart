import { consumer } from "../config/kafka.js";
import { reduceStock } from "../modules/inventory.service.js";
import { publishInventoryEvent } from "../producer/inventory.producer.js";
import logger from "../utils/logger.js";

export const startPaymentConsumer = async () => {
  await consumer.connect();
  logger.info("Payment consumer connected");
  await consumer.subscribe({
    topic: "payment.completed",
    fromBeginning: true
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const rawMessage = message.value?.toString() || "{}";
      let data = {};

      try {
        data = JSON.parse(rawMessage);
        const { productId, quantity } = data;

        await reduceStock(productId, quantity);

        logger.info(`Inventory updated after payment for order ${data.orderId}`);
      } catch (err) {
        try {
          await publishInventoryEvent({
            service: "inventory-service",
            event: "stock_update_failed",
            orderId: data.orderId,
            productId: data.productId,
            quantity: data.quantity,
            error: err.message,
          });
        } catch (publishErr) {
          logger.error(`Inventory failure event publish error: ${publishErr.message}`);
        }
        logger.error(`Inventory update failed: ${err.message}`);
      }
    }
  });
};
