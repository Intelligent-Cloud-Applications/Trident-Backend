/**
 * PUT /admin/events/{id} Controller
 */
const { updateItemFields } = require('../../services/dynamoService');
const { success, error } = require('../../utils/response');
const { requireAuth } = require('../../middleware/auth');
const { withErrorHandler } = require('../../middleware/errorHandler');

const update = async (event) => {
  const id = event.pathParameters?.id;
  if (!id) return error('Event ID is required', 400);

  let data;
  try {
    data = JSON.parse(event.body || '{}');
  } catch {
    return error('Invalid JSON payload', 400);
  }

  const updated = await updateItemFields(id, 'EVENT', {
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
