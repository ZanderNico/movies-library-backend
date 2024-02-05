const Movie = require("../models/movies.model")

const addComment = async (req, res) => {
  try {
    const movieId = req.params.id;
    const { userId, text } = req.body;

    const movie = await Movie.findByIdAndUpdate(
      movieId,
      { $push: { comments: { user: userId, text } } },
      { new: true }
    );

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const newComment = movie.comments[movie.comments.length - 1]; // Get the last added comment
    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller for getting comments
const getAllComments = async (req, res) => {
  try {
    const movieId = req.params.id;

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const comments = movie.comments;
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
  
  // Controller to update a comment in a movie
  const updateComment = async (req, res) => {
    try {
      const { movieId, commentId } = req.params;
      const { text } = req.body;
  
      const movie = await Movie.findById(movieId);
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
  
      const comment = movie.comments.id(commentId);
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      comment.text = text;
      await movie.save();
  
      res.json(comment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  const deleteComment = async (req, res) => {
    try {
      const { movieId, commentId } = req.params;
  
      const movie = await Movie.findByIdAndUpdate(
        movieId,
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );
  
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
  
      res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  module.exports = {
    addComment,
    getAllComments,
    updateComment,
    deleteComment,
  };