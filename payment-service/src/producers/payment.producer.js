const { producer } = require("../config/kafka");

const publishPaymentCompleted = async (payment) => {
  await producer.send({
    topic: "payment.completed",
    messages: [
      {
        key: payment.paymentId,
        value: JSON.stringify(payment),
      },
    ],
  });
};

module.exports = { publishPaymentCompleted };