const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const app = express();

require("dotenv").config({ path: "./config.env" });
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/AuthRoute");
const transactionRoute = require("./routes/TransactionRoute");

const port = process.env.PORT || 5000;

app.use(cors({
  // origin: 'http://localhost:5173', 
  origin: 'https://finance-tracker-frontend.onrender.com', // Update
  credentials: true               
}));

app.use(express.json());
app.use(cookieParser());
app.use(transactionRoute);
app.use("/", authRoute);
const dbo = require("./db/conn");
 
app.listen(port, () => {
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});