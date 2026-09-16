/**
 * PUT /admin/news/{id} Controller
 * 
 * Partial update — supports all rich media fields.
 */
const { updateItemFields } = require('../../services/dynamoService');
const { success, error } = require('../../utils/response');
const { requireAuth } = require('../../middleware/auth');
const { withErrorHandler } = require('../../middleware/errorHandler');

const update = async (event) => {
  const id = event.pathParameters?.id;
  if (!id) return error('News ID is required', 400);

  let data;
  try {
    data = JSON.parse(event.body || '{}');
  } catch {
    return error('Invalid JSON payload', 400);
  }

  // Validate arrays if provided
  if (data.images && !Array.isArray(data.images)) {
    return error('Images must be an array of URLs', 400);
  }
  if (data.pdfs && !Array.isArray(data.pdfs)) {
    return error('PDFs must be an array of {name, url} objects', 400);
  }

  const updated = await updateItemFields(id, 'NEWS', {
    ...data,
    updatedBy: event.user?.username || 'unknown',
    updatedByRole: event.user?.role || 'unknown',
    updatedByName: event.user?.displayName || 'Unknown',
  });
  return success(updated);
};

module.exports = {
  handler: withErrorHandler(requireAuth(update)),
};
