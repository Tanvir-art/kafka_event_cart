import { producer } from "../config/kafka.js";
import logger from "../utils/logger.js";

export const publishInventoryEvent = async (data) => {
  await producer.send({
    topic: "inventory.events",
    messages: [
      {
        value: JSON.stringify(data)
      }
    ]
  });

  logger.info(`Inventory event published for product ${data.productId}`);
};
