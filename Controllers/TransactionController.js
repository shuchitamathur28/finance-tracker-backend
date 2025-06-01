const Transactions = require("../Models/TransactionModel");
const mongoose = require('mongoose');

module.exports.AddTransaction = async (req, res, next) => {
  try {
    const { tname, amount } = req.body;
    const response = await Transactions.create({ name: tname, amount, user_id:req.user });
    if (!response) {
      return res.json({ message: "Transaction not added" });
    }
    res
      .status(201)
      .json({ message: "Transaction added successfully", success: true });
    next();
  } catch (error) {
    res
      .status(400)
      .json({ message: "Transaction could not be saved", success: false });
  }
};

module.exports.GetTransactions = async (req, res, next) => {
  try {
    const userId = String(req.user).trim();
    const objectId = mongoose.Types.ObjectId.createFromHexString(userId);

    let filter = { user_id: objectId };
    
    const { type, startDate, endDate, limit } = req.body.filters;
    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate).setHours(0, 0, 0, 0),
        $lte: new Date(endDate).setHours(23, 59, 59, 999),
      };
    }

    let query = Transactions.find(filter).sort({ createdAt: -1 });
    if (!isNaN(limit) && limit > 0) {
      query = query.limit(limit); 
    }

    const data = await query;

    if (type === 'income') {
      tranx = await data.filter(txn => txn.amount > 0);
    } else if (type === 'expense') {
      tranx = await data.filter(txn => txn.amount < 0);
    } else {
      tranx = data; 
    }

    res.status(200).json({
      success: true,
      count: data.length,
      data: tranx,
      message: "Transactions fetched successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
    // console.error(error);
  }
};

module.exports.DeleteTransaction = async (req, res, next) => {
  try {
    const id = String(req.params.id).trim();
    const objectId = mongoose.Types.ObjectId.createFromHexString(id);
    if (!mongoose.Types.ObjectId.isValid(objectId)) {
      return res.status(400).json({ message: "Invalid transaction ID" });
    }
    const deleted = await Transactions.findByIdAndDelete(objectId);
    if (!deleted) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};