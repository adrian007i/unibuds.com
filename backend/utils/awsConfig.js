const { S3Client } = require('@aws-sdk/client-s3');

require('dotenv').config();

// Initialize S3 client 
const s3Client = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET
    },
});


module.exports = { s3Client };