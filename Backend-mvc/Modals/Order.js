const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  customerID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "customer",
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  message: {
    type: String,
  },
  items: {
    type: Array,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
