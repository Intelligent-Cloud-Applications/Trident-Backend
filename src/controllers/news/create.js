/**
 * POST /admin/news Controller
 */
const { putItem } = require('../../services/dynamoService');
const { success, error } = require('../../utils/response');
const { requireAuth } = require('../../middleware/auth');
const { withErrorHandler } = require('../../middleware/errorHandler');

const create = async (event) => {
  let data;
  try {
    data = JSON.parse(event.body || '{}');
  } catch {
    return error('Invalid JSON payload', 400);
  }

  const id = 'news-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6);
  const timestamp = new Date().toISOString();

  const item = {
    PK: 'TYPE#NEWS',
    SK: `ID#${id}`,
    id,
    ...data,
    source: 'admin',
    isArchived: false,
    isNew: data.isNew ?? true,
    featured: data.featured ?? false,
    createdBy: event.user?.username || 'unknown',
    createdByRole: event.user?.role || 'unknown',
    createdByName: event.user?.displayName || 'Unknown',
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  await putItem(item);
  return success(item, 201);
};

module.exports = {
  handler: withErrorHandler(requireAuth(create)),
};
