const express = require('express');
const router = express.Router();
const favController = require('../controllers/favorites.controller');

router.post('/users/:userId/favorites/movies/:movieId', favController.addFavoriteMovie);

router.delete('/users/:userId/favorites/movies/:movieId', favController.deleteFavoriteMovie);

router.post('/users/:userId/favorites/collections/:collectionId', favController.addFavoriteCollection)

router.delete('/users/:userId/favorites/collections/:collectionId', favController.deleteFavoriteCollection);




module.exports = router;