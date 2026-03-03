const { createOrder } = require("./order.service");

const createOrderHandler = async (req, res) => {
  try {
    const order = await createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Order failed", error });
  }
};

module.exports = { createOrderHandler };