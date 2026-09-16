/**
 * POST /admin/news Controller
 * 
 * Creates a news item with rich media support:
 * - coverImage (S3 URL)
 * - images[] (gallery S3 URLs)
 * - pdfs[] ({name, url} objects)
 * - videoUrl (YouTube/Vimeo embed URL)
 */
const { putItem } = require('../../services/dynamoService');
const { success, error } = require('../../utils/response');
const { requireAuth } = require('../../middleware/auth');
const { withErrorHandler } = require('../../middleware/errorHandler');
const { validateNewsPayload } = require('../../utils/validation');

const create = async (event) => {
  let data;
  try {
    data = JSON.parse(event.body || '{}');
  } catch {
    return error('Invalid JSON payload', 400);
  }

  // Validate
  const errors = validateNewsPayload(data);
  if (errors.length > 0) {
    return error('Validation failed', 400, errors);
  }

  const id = 'news-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6);
  const timestamp = new Date().toISOString();

  const item = {
    PK: 'TYPE#NEWS',
    SK: `ID#${id}`,
    id,
    title: data.title,
    description: data.description || '',
    category: data.category || 'General',
    date: data.date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),

    // Rich media fields
    coverImage: data.coverImage || '',
    images: Array.isArray(data.images) ? data.images : [],
    pdfs: Array.isArray(data.pdfs) ? data.pdfs : [],

    // Flags
    featured: data.featured ?? false,
    isNew: data.isNew ?? true,
    linkUrl: data.linkUrl || '',

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
