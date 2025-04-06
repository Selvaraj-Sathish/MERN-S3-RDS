const AWS = require('aws-sdk');
const dotenv = require('dotenv');

dotenv.config();

// Configure AWS S3 without explicit credentials
// AWS SDK will automatically use the IAM role attached to the instance
const s3 = new AWS.S3({
  region: process.env.AWS_REGION || 'us-east-1'
});

module.exports = s3;
