// const { producer } = require("../config/kafka");

// const publishPaymentCompleted = async (payment) => {
//   await producer.send({
//     topic: "payment.completed",
//     messages: [
//       {
//         key: payment.paymentId,
//         value: JSON.stringify(payment),
//       },
//     ],
//   });
// };

// module.exports = { publishPaymentCompleted };

const { producer } = require("../config/kafka");

const publishPaymentCompleted = async (data) => {
  await producer.send({
    topic: "payment.completed",
    messages: [
      {
        value: JSON.stringify(data)
      }
    ]
  });

  console.log("Payment success event published:", data);
};

module.exports = { publishPaymentCompleted };