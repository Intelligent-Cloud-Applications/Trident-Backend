/**
 * PUT /admin/notices/{id} Controller
 */
const { updateItemFields } = require('../../services/dynamoService');
const { success, error } = require('../../utils/response');
const { requireAuth } = require('../../middleware/auth');
const { withErrorHandler } = require('../../middleware/errorHandler');

const update = async (event) => {
  const id = event.pathParameters?.id;
  if (!id) return error('Notice ID is required', 400);

  let data;
  try {
    data = JSON.parse(event.body || '{}');
  } catch {
    return error('Invalid JSON payload', 400);
  }

  const updated = await updateItemFields(id, 'NOTICE', data);
  return success(updated);
};

module.exports = {
  handler: withErrorHandler(requireAuth(update)),
};
