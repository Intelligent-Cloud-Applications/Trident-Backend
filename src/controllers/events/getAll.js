/**
 * GET /events Controller
 */
const { queryItemsByType } = require('../../services/dynamoService');
const { success } = require('../../utils/response');
const { withErrorHandler } = require('../../middleware/errorHandler');

const getAll = async () => {
  const events = await queryItemsByType('EVENT');
  return success(events);
};

module.exports = {
  handler: withErrorHandler(getAll),
};
