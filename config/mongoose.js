const mongoose = require("mongoose");
require("dotenv").config();
const movieDB = process.env.DB;
mongoose.connect(movieDB);
const db = mongoose.connection;

db.on("error", () => {
  console.error.bind(console, "Error in connecting with :: MongoDB");
});

db.once("open", () => {
  console.log("Successfully connected to :: MongoDB");
});

module.exports = db;
