const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/MovieDB");
const db = mongoose.connection;

db.on("error", () => {
  console.error.bind(console, "Error in connecting with :: MongoDB");
});

db.once("open", () => {
  console.log("Successfully connected to :: MongoDB");
});

module.exports = db;
