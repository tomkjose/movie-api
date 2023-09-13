const Movies = require("../models/Movies");

module.exports.addMovies = async (req, res) => {
  try {
    const movie = new Movies({
      title: req.body.title,
      duration: req.body.duration,
      description: req.body.description,
      category: req.body.category,
      thumbnail: req.body.thumbnail,
      image: req.body.image,
      trailer: req.body.rating,
      user: req.body.userId,
    });
    const newMovie = await movie.save();

    res.status(201).json({
      message: "New Movie Added",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.fetchMovies = async (req, res) => {
  try {
    const movies = await Movies.find();
    res.json({
      movies: movies,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteMovies = async (req, res) => {
  try {
    const movie = await Movies.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not Found" });
    }

    res.json({
      message: "Movie deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateMovies = async (req, res) => {
  try {
    const movie = await Movies.findByIdAndUpdate(req.params.id, req.body);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json({
      message: "Movie updated Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateRating = async (req, res) => {
  try {
    const movie = await Movies.findById(req.params.id);
    const newRating = req.body.rating;
    console.log("newRating", newRating);
    console.log("req.body", req.body);
    movie.rating =
      (movie.rating * movie.ratingCount + newRating) / (movie.ratingCount + 1);
    movie.ratingCount += 1;
    await movie.save();
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json({
      message: "Movie Rating updated Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.fetchMovieDetails = async (req, res) => {
  try {
    const movie = await Movies.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json({
      movie: movie,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.fetchMovieCategory = async (req, res) => {
  try {
    const category = await Movies.find({ category: req.params.category });

    if (!category || category.length === 0) {
      return res.status(404).json({ message: "Catergory not found " });
    }
    res.status(200).json({
      movies: category,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
