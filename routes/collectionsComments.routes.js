const express = require('express');
const router = express.Router();
const commentController = require('../controllers/collectionsComment.controller');

router.post('/collections/:id/comments', commentController.addCommentToCollection);

router.put('/collections/:collectionId/comments/:commentId', commentController.updateCommentInCollection);

router.delete('/collections/:collectionId/comments/:commentId', commentController.deleteCommentInCollection);

router.get('/collections/:id/comments', commentController.getAllCommentsInCollection);

module.exports = router;