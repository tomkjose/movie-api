const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret_key = process.env.SECRET_KEY;
function authenticationToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Authentication token missing." });
  }
  jwt.verify(token, secret_key, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token." });
    }

    req.userId = decoded.userId;
    next();
  });
}

module.exports = authenticationToken;
