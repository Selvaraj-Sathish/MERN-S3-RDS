const express = require('express');
const router = express.Router();
const { uploadFile, deleteFile } = require('../controllers/fileController');

router.post('/upload', uploadFile);
router.delete('/:key', deleteFile);

module.exports = router;
