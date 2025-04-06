const express = require('express');
const router = express.Router();
const {
  addAttachment,
  getTaskAttachments,
  deleteAttachment
} = require('../controllers/taskAttachmentController');

router.post('/', addAttachment);
router.get('/:taskId', getTaskAttachments);
router.delete('/:id', deleteAttachment);

module.exports = router;
