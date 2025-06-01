const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const transactionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Transactions", transactionSchema);