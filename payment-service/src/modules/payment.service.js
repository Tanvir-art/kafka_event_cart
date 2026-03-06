const { v4: uuidv4 } = require("uuid");
const Payment = require("./payment.model");
const { publishPaymentCompleted } = require("../producers/payment.producer");

// const processPayment = async (order) => {
//   const paymentId = uuidv4();

//   const payment = await Payment.create({
//     paymentId,
//     orderId: order.orderId,
//     amount: order.amount,
//   });

//   await publishPaymentCompleted(payment);

//   return payment;
// };


const processPayment = async (order) => {
  const paymentId = uuidv4();

  const payment = await Payment.create({
    paymentId,
    orderId: order.orderId,
    amount: order.amount,
  });

  await publishPaymentCompleted({
    orderId: order.orderId,
    productId: order.items[0].productId,
    quantity: order.items[0].quantity
  });

  return payment;
};

module.exports = { processPayment };