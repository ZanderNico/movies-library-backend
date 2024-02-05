const Movie = require("../models/movies.model");
const User = require("../models/user.model");

const createMovie = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.params.user_id;

    // Validate that the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Extracted Values:", { title, description, userId });

    const newMovie = new Movie({ title, description, user: userId });
    await newMovie.validate();
    await newMovie.save();

    // Update the user's movies array
    user.movies.push(newMovie);
    await user.save();

    res.status(201).json(newMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to get all movies
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().populate("user", "username"); // Populate user information
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to get a specific movie by ID
const getMovieById = async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await Movie.findById(movieId).populate("user", "username"); // Populate user information
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to update a specific movie by ID
const updateMovieById = async (req, res) => {
  try {
    const movieId = req.params.id;
    const { title, description } = req.body;
    const updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
      { title, description },
      { new: true } // Return the updated document
    );
    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(updatedMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to delete a specific movie by ID
const deleteMovieById = async (req, res) => {
  try {
    const movieId = req.params.id;

    // Find the movie to get the associated user ID
    const deletedMovie = await Movie.findById(movieId);
    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const userId = deletedMovie.user;

    // Delete the movie
    const deletedMovieResult = await Movie.findByIdAndDelete(movieId);
    if (!deletedMovieResult) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Update the user's movies array
    const user = await User.findById(userId);
    if (user) {
      user.movies = user.movies.filter(userMovieId => !userMovieId.equals(movieId));
      await user.save();
    }

    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovieById,
  deleteMovieById,
};
