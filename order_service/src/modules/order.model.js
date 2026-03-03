const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderId: String,
    userId: String,
    items: [
      {
        productId: String,
        quantity: Number,
      },
    ],
    amount: Number,
    status: {
      type: String,
      default: "PENDING",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
 