const { v4: uuidv4 } = require("uuid");
const Order = require("./order.model");
const { publishOrderCreated } = require("../producer/order.producer");
const logger = require("../utils/logger");

const createOrder = async (data) => {
  const orderId = uuidv4();

  const newOrder = await Order.create({
    orderId,
    userId: data.userId,
    items: data.items,
    amount: data.amount,
  });

  await publishOrderCreated(newOrder);
  logger.info(`Kafka event sent for order ${newOrder.orderId}`);

  return newOrder;
};

module.exports = { createOrder };
