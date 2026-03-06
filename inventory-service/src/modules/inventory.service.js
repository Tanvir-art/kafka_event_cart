import Inventory from "./inventory.model.js";
import logger from "../utils/logger.js";
import { publishInventoryEvent } from "../producer/inventory.producer.js";

export const reduceStock = async (productId, quantity) => {
  const product = await Inventory.findOne({ productId });

  if (!product) {
    throw new Error("Product not found in inventory");
  }

  if (product.stock < quantity) {
    throw new Error("Insufficient stock");
  }

  product.stock -= quantity;

  await product.save();

  await publishInventoryEvent({
    service: "inventory-service",
    productId,
    quantity,
    event: "stock_reduced"
  });

  logger.info(`Stock updated for product ${productId}, remaining ${product.stock}`);
};
