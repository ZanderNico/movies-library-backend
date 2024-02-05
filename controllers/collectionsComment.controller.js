const {Collection} = require("../models/collections.model");

// Controller to add a comment to a collection
const addCommentToCollection = async (req, res) => {
  try {
    const collectionId = req.params.id;
    const { userId, text } = req.body;

    const collection = await Collection.findById(collectionId);
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    const newComment = { user: userId, text };
    collection.comments.push(newComment);
    await collection.save();

    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to update a comment in a collection
const updateCommentInCollection = async (req, res) => {
  try {
    const { collectionId, commentId } = req.params;
    const { text } = req.body;

    const collection = await Collection.findById(collectionId);
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    const comment = collection.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    comment.text = text;
    await collection.save();

    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to delete a comment in a collection
const deleteCommentInCollection = async (req, res) => {
  try {
    const { collectionId, commentId } = req.params;

    const collection = await Collection.findById(collectionId);
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    // Find the index of the comment by its id
    const commentIndex = collection.comments.findIndex(comment => comment._id.toString() === commentId);

    // Check if the comment exists
    if (commentIndex === -1) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Use the index to remove the comment from the array
    collection.comments.pull(collection.comments[commentIndex]);
    
    await collection.save();

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllCommentsInCollection = async (req, res) => {
  try {
    const collectionId = req.params.id;

    const collection = await Collection.findById(collectionId);
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    const comments = collection.comments;
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = {
  addCommentToCollection,
  updateCommentInCollection,
  deleteCommentInCollection,
  getAllCommentsInCollection
};
