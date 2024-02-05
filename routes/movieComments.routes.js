const express = require('express');
const router = express.Router();
const commentController = require('../controllers/moviesComments.controller');

router.post('/movies/:id/comments', commentController.addComment);

router.get('/movies/:id/comments', commentController.getAllComments);

router.put('/movies/:movieId/comments/:commentId', commentController.updateComment);

router.delete('/movies/:movieId/comments/:commentId', commentController.deleteComment);

module.exports = router;