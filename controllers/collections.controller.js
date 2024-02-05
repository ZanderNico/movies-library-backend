const {Collection} = require('../models/collections.model');
const Movie = require('../models/movies.model');
const User = require('../models/user.model');

const createCollection = async (req, res) => {
  try {
    const { title, description, userId, movieIds } = req.body;

    // Create a new collection
    const newCollection = new Collection({ title, description, user: userId });

    // Check if movieIds are provided
    if (movieIds && Array.isArray(movieIds)) {
      // Associate movies with the collection
      newCollection.movies = movieIds;

      // Update each movie's reference to the collection
      await Movie.updateMany({ _id: { $in: movieIds } }, { $push: { collections: newCollection._id } });
    }

    // Save the new collection
    await newCollection.save();

    // Update user's reference to the new collection
    await User.findByIdAndUpdate(userId, { $push: { collections: newCollection._id } });

    res.status(201).json(newCollection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getCollectionById = async (req, res) => {
  try {
    const collectionId = req.params.id;
    const collection = await Collection.findById(collectionId).populate('user', 'username').populate('movies');
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    res.json(collection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller to update a specific collection by ID
const updateCollectionById = async (req, res) => {
  try {
    const collectionId = req.params.id;
    const { title, description, movieIds } = req.body;

    // Find the existing collection
    const existingCollection = await Collection.findById(collectionId);
    if (!existingCollection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    // Update collection details
    existingCollection.title = title;
    existingCollection.description = description;

    // Update movies associated with the collection
    if (movieIds && Array.isArray(movieIds)) {
      existingCollection.movies = movieIds;

      // Update each movie's reference to the collection
      await Movie.updateMany({ _id: { $in: movieIds } }, { $push: { collections: collectionId } });
    }

    // Save the updated collection
    const updatedCollection = await existingCollection.save();

    res.json(updatedCollection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller to delete a specific collection by ID
const deleteCollectionById = async (req, res) => {
  try {
    const collectionId = req.params.id;

    // Find the collection to be deleted
    const collectionToDelete = await Collection.findById(collectionId);
    if (!collectionToDelete) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    // Remove references from associated movies
    await Movie.updateMany({ _id: { $in: collectionToDelete.movies } }, { $pull: { collections: collectionId } });

    // Remove references from associated user
    await User.findByIdAndUpdate(collectionToDelete.user, { $pull: { collections: collectionId } });

    // Delete the collection
    await Collection.findByIdAndDelete(collectionId);

    res.json({ message: 'Collection deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createCollection,
  getCollectionById,
  updateCollectionById,
  deleteCollectionById,
};