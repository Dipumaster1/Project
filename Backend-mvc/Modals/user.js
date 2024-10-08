const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  role: {
    type: String,

    default: null,
  },
  Phone: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model("user", userSchema);

module.exports = User;
