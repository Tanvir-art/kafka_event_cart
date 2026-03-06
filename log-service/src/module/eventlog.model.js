const mongoose = require("mongoose");

const eventLogSchema = new mongoose.Schema(
  {
    topic: String,
    service: String,
    event: String,
    payload: Object,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("EventLog", eventLogSchema);