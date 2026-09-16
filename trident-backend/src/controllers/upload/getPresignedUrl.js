/**
 * POST /admin/upload/presign Controller
 * 
 * Returns a pre-signed S3 PUT URL for direct browser upload.
 * The browser uploads the file directly to S3 — no data goes through Lambda.
 * This removes all payload size limits (supports up to 5GB per file).
 */
const { generatePresignedUploadUrl } = require('../../services/s3Service');
const { success, error } = require('../../utils/response');
const { requireAuth } = require('../../middleware/auth');
const { withErrorHandler } = require('../../middleware/errorHandler');

const getPresignedUrl = async (event) => {
  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return error('Invalid JSON payload', 400);
  }

  const { fileName, contentType } = body;

  if (!fileName) {
    return error('fileName is required', 400);
  }

  const result = await generatePresignedUploadUrl(
    fileName,
    contentType || 'application/octet-stream'
  );

  return success(result);
};

module.exports = {
  handler: withErrorHandler(requireAuth(getPresignedUrl)),
};
