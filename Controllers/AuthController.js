const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);
    // res.cookie("token", token, {
    //   withCredentials: true,
    //   httpOnly: false,
    // });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user, token });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if(!email || !password){
      return res.json({ message: "All fields are required"});
    }
    const userdata = await User.findOne({ email });
    if (!userdata) {
      return res.json({ message: "Incorrect email or password" });
    }
    const auth = await bcrypt.compare(password,userdata.password);
    if(!auth){
      return res.json({ message: "Incorrect email or password" });
    }
    const token = createSecretToken(userdata._id);
    // res.cookie("token", token, {
    //   path: "/",
    //   httpOnly: false,
    //   secure: false,
    //   sameSite: "Lax"
    // });
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true, userdata, token });
    next();
  } catch (error) {
    console.error(error);
  }
};