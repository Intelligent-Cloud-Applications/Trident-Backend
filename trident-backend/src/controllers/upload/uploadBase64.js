/**
 * POST /admin/upload/base64 Controller
 * 
 * Uploads a base64 encoded file directly to S3.
 */
const { uploadBase64ToS3 } = require('../../services/s3Service');
const { success, error } = require('../../utils/response');
const { requireAuth } = require('../../middleware/auth');
const { withErrorHandler } = require('../../middleware/errorHandler');

const uploadBase64 = async (event) => {
  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return error('Invalid JSON payload', 400);
  }

  const { fileName, contentType, base64Data } = body;

  if (!fileName || !base64Data) {
    return error('fileName and base64Data are required', 400);
  }

  const result = await uploadBase64ToS3(
    fileName,
    contentType || 'application/octet-stream',
    base64Data
  );

  return success(result);
};

module.exports = {
  handler: withErrorHandler(requireAuth(uploadBase64)),
};
