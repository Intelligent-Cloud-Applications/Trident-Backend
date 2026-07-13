/**
 * GET /notices Controller
 */
const { queryItemsByType } = require('../../services/dynamoService');
const { success } = require('../../utils/response');
const { withErrorHandler } = require('../../middleware/errorHandler');

const getAll = async () => {
  const notices = await queryItemsByType('NOTICE');
  return success(notices);
};

module.exports = {
  handler: withErrorHandler(getAll),
};
