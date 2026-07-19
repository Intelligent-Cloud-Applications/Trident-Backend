/**
 * DELETE /admin/notices/{id} Controller
 */
const { archiveItemById } = require('../../services/dynamoService');
const { success, error } = require('../../utils/response');
const { requireAuth } = require('../../middleware/auth');
const { withErrorHandler } = require('../../middleware/errorHandler');

const del = async (event) => {
  const id = event.pathParameters?.id;
  if (!id) return error('Notice ID is required', 400);

  const result = await archiveItemById(id, 'NOTICE', {
    archivedBy: event.user?.username || 'unknown',
    archivedByRole: event.user?.role || 'unknown',
    archivedByName: event.user?.displayName || 'Unknown',
  });
  return success(result);
};

module.exports = {
  handler: withErrorHandler(requireAuth(del)),
};
