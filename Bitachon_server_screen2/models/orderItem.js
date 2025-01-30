const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" }, 
  productId: mongoose.Schema.Types.ObjectId,
  productName: String, 
  quantity: Number,     
  price: Number       
});

const OrderItem = mongoose.model("OrderItem", OrderItemSchema);

module.exports = OrderItem;
