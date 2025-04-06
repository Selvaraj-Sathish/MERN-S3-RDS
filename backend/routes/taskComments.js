const express = require('express');
const router = express.Router();
const {
  addComment,
  getTaskComments,
  deleteComment
} = require('../controllers/taskCommentController');

router.post('/', addComment);
router.get('/:taskId', getTaskComments);
router.delete('/:id', deleteComment);

module.exports = router;
