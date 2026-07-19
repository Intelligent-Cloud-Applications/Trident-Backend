/**
 * S3 Service Layer for Uploads
 */
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const BUCKET_REGION = process.env.UPLOAD_BUCKET_REGION || 'us-east-1';
const s3Client = new S3Client({ region: BUCKET_REGION });
const BUCKET_NAME = process.env.UPLOAD_BUCKET_NAME;

async function uploadFileToS3(fileName, base64Data, contentType = 'image/jpeg') {
  // Strip data URL prefix if present (e.g. data:application/pdf;base64,...)
  const base64Clean = base64Data.replace(/^data:([^;]+);base64,/, '');
  const buffer = Buffer.from(base64Clean, 'base64');

  const key = `uploads/${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  });

  await s3Client.send(command);

  // Return public URL (path-style because bucket name contains dots)
  return `https://s3.${BUCKET_REGION}.amazonaws.com/${BUCKET_NAME}/${key}`;
}

module.exports = {
  uploadFileToS3,
};
