const { AddTransaction, GetTransactions, DeleteTransaction } = require("../Controllers/TransactionController.js");
const { userVerification, authenticate } = require("../Middlewares/AuthMiddleware.js");

const router = require("express").Router();

router.post("/addtransaction", authenticate,  AddTransaction);
router.post("/gettransactions", authenticate,  GetTransactions);
router.post("/deletetransaction/:id",authenticate, DeleteTransaction);
// router.post('/',userVerification);

module.exports = router;
