/**
 * S3 Service Layer
 * 
 * Provides:
 * - generatePresignedUploadUrl() — returns a pre-signed PUT URL for direct browser-to-S3 upload
 */
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const BUCKET_REGION = process.env.UPLOAD_BUCKET_REGION || 'us-east-1';
const s3Client = new S3Client({ 
  region: BUCKET_REGION,
  requestChecksumCalculation: 'WHEN_REQUIRED',
  responseChecksumValidation: 'WHEN_REQUIRED'
});
const BUCKET_NAME = process.env.UPLOAD_BUCKET_NAME;

/**
 * Sanitize a filename — keep only safe characters.
 */
function sanitizeFileName(name) {
  return name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
}

/**
 * Generate a pre-signed PUT URL for direct browser upload to S3.
 * 
 * @param {string} fileName - Original file name
 * @param {string} contentType - MIME type (e.g., 'image/jpeg', 'application/pdf')
 * @returns {{ uploadUrl: string, fileUrl: string, key: string }}
 */
async function generatePresignedUploadUrl(fileName, contentType) {
  const key = `uploads/${Date.now()}-${sanitizeFileName(fileName)}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  // Pre-signed URL valid for 15 minutes
  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 900 });

  // The final public URL where the file will be accessible after upload
  const fileUrl = `https://s3.${BUCKET_REGION}.amazonaws.com/${BUCKET_NAME}/${key}`;

  return { uploadUrl, fileUrl, key };
}

async function uploadBase64ToS3(fileName, contentType, base64Data) {
  const key = `uploads/${Date.now()}-${sanitizeFileName(fileName)}`;

  // Remove the data URL prefix if it exists (e.g., "data:image/jpeg;base64,")
  const base64String = base64Data.replace(/^data:([A-Za-z-+/]+);base64,/, '');
  const buffer = Buffer.from(base64String, 'base64');

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: contentType,
    ContentEncoding: 'base64'
  });

  await s3Client.send(command);

  // The final public URL where the file will be accessible after upload
  const fileUrl = `https://s3.${BUCKET_REGION}.amazonaws.com/${BUCKET_NAME}/${key}`;

  return { fileUrl, key };
}

module.exports = {
  generatePresignedUploadUrl,
  uploadBase64ToS3
};
