const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    paymentId: String,
    orderId: String,
    amount: Number,
    status: {
      type: String,
      default: "COMPLETED",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);