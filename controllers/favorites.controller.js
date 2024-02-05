const Users = require("../models/user.model");
const Movie = require("../models/movies.model");
const { Collection } = require("../models/collections.model");

const addFavoriteMovie = async (req, res) => {
  try {
    const { userId, movieId } = req.params;

    // Check if the user and movie exist
    const user = await Users.findById(userId);
    const movie = await Movie.findById(movieId);

    if (!user || !movie) {
      return res.status(404).json({ error: "User or movie not found." });
    }

    // Check if the movie is already in favorites
    if (user.favoriteMovies.includes(movieId)) {
      return res.status(400).json({ error: "Movie is already in favorites." });
    }
    // Add the movie to the user's favoriteMovies array
    user.favoriteMovies.push(movieId);
    await user.save();

    res.status(200).json({ message: "Movie added to favorites successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteFavoriteMovie = async (req, res) => {
  try {
    const { userId, movieId } = req.params;

    // Check if the user and movie exist
    const user = await Users.findById(userId);
    const movie = await Movie.findById(movieId);

    if (!user || !movie) {
      return res.status(404).json({ error: "User or movie not found." });
    }

    // Remove the movie from the user's favoriteMovies array
    user.favoriteMovies.pull(movieId);
    await user.save();

    res
      .status(200)
      .json({ message: "Movie removed from favorites successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addFavoriteCollection = async (req, res) => {
  try {
    const { userId, collectionId } = req.params;

    // Check if the user and collection exist
    const user = await Users.findById(userId);
    const collection = await Collection.findById(collectionId);

    if (!user || !collection) {
      return res.status(404).json({ error: "User or collection not found." });
    }

    // Check if the collection is already in favorites
    if (user.favoriteCollections.includes(collectionId)) {
      return res
        .status(400)
        .json({ error: "Collection is already in favorites." });
    }

    // Add the collection to the user's favoriteCollections array
    user.favoriteCollections.push(collectionId);
    await user.save();

    res
      .status(200)
      .json({ message: "Collection added to favorites successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteFavoriteCollection = async (req, res) => {
  try {
    const { userId, collectionId } = req.params;

    // Check if the user and collection exist
    const user = await Users.findById(userId);
    const collection = await Collection.findById(collectionId);

    if (!user || !collection) {
      return res.status(404).json({ error: "User or collection not found." });
    }

    // Remove the collection from the user's favoriteCollections array
    user.favoriteCollections.pull(collectionId);
    await user.save();

    res
      .status(200)
      .json({ message: "Collection removed from favorites successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addFavoriteMovie,
  deleteFavoriteMovie,
  addFavoriteCollection,
  deleteFavoriteCollection,
};
