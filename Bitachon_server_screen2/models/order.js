const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userName: String,      
  userEmail: String,     
  userAddress: String,   
  createdAt: { type: Date, default: Date.now } 
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;





