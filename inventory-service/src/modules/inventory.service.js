import Inventory from "./inventory.model.js";
import logger from "../utils/logger.js";

export const reduceStock = async (productId, quantity) => {
  console.log(`Attempting to reduce stock for product ${productId} by ${quantity}`);
  const product = await Inventory.findOne({ productId });
  console.log(`Current stock for product ${productId}:`, product ? product.stock : "Product not found");

  if (!product) {
    throw new Error("Product not found in inventory");
  }

  if (product.stock < quantity) {
    throw new Error("Insufficient stock");
  }

  product.stock -= quantity;

  await product.save();

  logger.info(`Stock updated for ${productId}`);
};