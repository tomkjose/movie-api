const Users = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

require("dotenv").config();
const secret_key = process.env.SECRET_KEY;

module.exports.signIn = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log("email backend", email);
    console.log("password backend", password);
    const user = await Users.findOne({ email: email });
    console.log("user", user);
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
    const user = new Users({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const newUser = await user.save();
    res.status(201).json({ newUser: "New User Registered Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.update = async (req, res) => {
  try {
    const user = await Users.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).json({ message: "User Details Updated" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.fetchUserDetails = async (req, res) => {
  try {
    const userId = mongoose.Types.ObjectId(req.params.id);
    const user = await Users.findOne(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
