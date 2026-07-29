/**
 * GET /news Controller
 */
const { queryItemsByType } = require('../../services/dynamoService');
const { success } = require('../../utils/response');
const { withErrorHandler } = require('../../middleware/errorHandler');

const getAll = async () => {
  const news = await queryItemsByType('NEWS');
  return success(news);
};

module.exports = {
  handler: withErrorHandler(getAll),
};
