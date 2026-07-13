/**
 * POST /admin/notices Controller
 */
const { v4: uuidv4 } = require('uuid');
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

  const id = 'notice-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6);
  const timestamp = new Date().toISOString();

  const item = {
    PK: 'TYPE#NOTICE',
    SK: `ID#${id}`,
    id,
    type: data.category || 'General',
    ...data,
    source: 'admin',
    isArchived: false,
    isNew: true,
    createdBy: event.user?.username || 'admin@tat.tekkzy.com',
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  await putItem(item);
  return success(item, 201);
};

module.exports = {
  handler: withErrorHandler(requireAuth(create)),
};
