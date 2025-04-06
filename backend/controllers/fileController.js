const s3 = require('../config/s3');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Multer storage configuration for temporary file storage
const storage = multer.memoryStorage();

// File filter to restrict file types
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, PDF and Word documents are allowed.'), false);
  }
};

// Multer upload configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  }
}).single('file');

// Helper function to get file extension
const getFileExtension = (filename) => {
  return path.extname(filename);
};

// @desc    Upload file to S3
// @route   POST /api/files/upload
// @access  Public
exports.uploadFile = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
    
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    try {
      const fileExtension = getFileExtension(req.file.originalname);
      const fileName = `${uuidv4()}${fileExtension}`;
      
      // Set S3 upload parameters
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `uploads/${fileName}`,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
        //ACL: 'public-read'
      };
      
      // Upload file to S3
      const s3Response = await s3.upload(params).promise();
      
      res.status(200).json({
        success: true,
        fileUrl: s3Response.Location,
        key: s3Response.Key,
        fileName: req.file.originalname
      });
    } catch (error) {
      console.error('Error uploading to S3:', error);
      res.status(500).json({ success: false, error: 'Failed to upload file' });
    }
  });
};

// @desc    Delete file from S3
// @route   DELETE /api/files/:key
// @access  Public
exports.deleteFile = async (req, res) => {
  try {
    const { key } = req.params;
    
    // Set S3 delete parameters
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key
    };
    
    // Delete file from S3
    await s3.deleteObject(params).promise();
    
    res.status(200).json({ success: true, message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting from S3:', error);
    res.status(500).json({ success: false, error: 'Failed to delete file' });
  }
};
