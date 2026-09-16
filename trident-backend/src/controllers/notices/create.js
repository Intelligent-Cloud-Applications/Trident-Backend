/**
 * POST /admin/notices Controller
 * 
 * Creates a notice with optional multi-file attachments.
 */
const { putItem } = require('../../services/dynamoService');
const { success, error } = require('../../utils/response');
const { requireAuth } = require('../../middleware/auth');
const { withErrorHandler } = require('../../middleware/errorHandler');
const { validateNoticePayload } = require('../../utils/validation');

const create = async (event) => {
  let data;
  try {
    data = JSON.parse(event.body || '{}');
  } catch {
    return error('Invalid JSON payload', 400);
  }

  // Validate
  const errors = validateNoticePayload(data);
  if (errors.length > 0) {
    return error('Validation failed', 400, errors);
  }

  const id = 'notice-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6);
  const timestamp = new Date().toISOString();

  const item = {
    PK: 'TYPE#NOTICE',
    SK: `ID#${id}`,
    id,
    title: data.title,
    description: data.description || '',
    category: data.category || 'General',
    date: data.date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),

    // File attachments
    imageUrl: data.imageUrl || '',
    fileUrl: data.fileUrl || '',
    linkUrl: data.linkUrl || '',
    attachments: Array.isArray(data.attachments) ? data.attachments : [],

    // Flags
    isNew: data.isNew ?? true,
    isPinned: data.isPinned || false,

    // System fields
    source: 'admin',
    isArchived: false,
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
