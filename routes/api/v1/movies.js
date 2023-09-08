const express = require("express");
const router = express.Router();
const authenticationToken = require("../../../middleware/JWTmiddleware");
const MovieController = require("../../../controllers/movies_api");

router.get("/", MovieController.fetchMovies);
router.get("/movie/:id", MovieController.fetchMovieDetails);
router.get("/category/:category", MovieController.fetchMovieCategory);
router.post("/", authenticationToken, MovieController.addMovies);
router.delete("/:id", authenticationToken, MovieController.deleteMovies);
router.put("/:id", authenticationToken, MovieController.updateMovies);
router.put("/rating/:id", authenticationToken, MovieController.updateRating);

module.exports = router;
