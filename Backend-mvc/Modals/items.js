// const mongoose = require("mongoose");
// const itemsSchema = new mongoose.Schema({

//   orderID: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: "Order",
//   },
//   productID:{
//     type:String,
//     required:true
//   },
//   Quantity:{
//     type:String,
//     required:true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });
// const Items = mongoose.model("items", itemsSchema);

// module.exports = Items;
const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({
  orderID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Order",
  },
  productID: {
    type: String,
    required: true,
  },
  Quantity: {
    type: String,
    required: true,
  },
});
const Items = mongoose.model("items", itemSchema);

module.exports = Items;
