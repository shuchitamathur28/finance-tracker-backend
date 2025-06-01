const User = require("../Models/UserModel");
require("dotenv").config({ path: "./config.env" });
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
  const token = req.token
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
      const user = await User.findById(data.id)
      if (user) return res.json({ status: true, user: user.username })
      else return res.json({ status: false })
    }
  })
}

module.exports.authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded.id;
    next();
  } catch (err) {
    // console.log('err', err);
    res.status(401).json({ msg: 'Invalid token' });
  }
}
