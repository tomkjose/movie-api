const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret_key = process.env.SECRET_KEY;

module.exports.signIn = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({
        message: "User not registred or Worng password",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        message: "User not registred or Worng password",
      });
    }

    const token = jwt.sign({ userId: user._id }, secret_key);
    res.status(200).json({ token: token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.signUp = async (req, res) => {
  console.log("SignUp");
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const newUser = user.save();
    res.status(201).json({ message: "New User Registered Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
