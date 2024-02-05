const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collections.controller');

router.post('/collections/create', collectionController.createCollection);

router.get('/collections/:id', collectionController.getCollectionById);

router.put('/collections/:id', collectionController.updateCollectionById);

router.delete('/collections/:id', collectionController.deleteCollectionById);

module.exports = router;