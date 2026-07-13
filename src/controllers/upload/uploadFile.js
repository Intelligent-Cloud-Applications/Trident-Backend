/**
 * POST /admin/upload Controller
 */
const { uploadFileToS3 } = require('../../services/s3Service');
const { success, error } = require('../../utils/response');
const { requireAuth } = require('../../middleware/auth');
const { withErrorHandler } = require('../../middleware/errorHandler');

const upload = async (event) => {
  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return error('Invalid JSON payload', 400);
  }

  const { fileName, fileData, contentType } = body;

  if (!fileName || !fileData) {
    return error('fileName and fileData (base64) are required', 400);
  }

  const url = await uploadFileToS3(fileName, fileData, contentType || 'image/jpeg');
  return success({ url });
};

module.exports = {
  handler: withErrorHandler(requireAuth(upload)),
};
