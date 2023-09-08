const express = require("express");
const PORT = 8080;
const cors = require("cors");
const db = require("./config/mongoose");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/", require("./routes"));

app.listen(PORT, (error) => {
  if (error) console.log(`Error in runnning server PORT at :: ${PORT}`, error);
  console.log(`Server is running successfully at PORT :: ${PORT} `);
});
