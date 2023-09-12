const express = require("express");
const router = express.Router();

const UserController = require("../../../controllers/user_api");

router.post("/signin", UserController.signIn);
router.post("/signup", UserController.signUp);
router.put("/update/:id", UserController.update);
router.get("/:id", UserController.fetchUserDetails);
module.exports = router;
