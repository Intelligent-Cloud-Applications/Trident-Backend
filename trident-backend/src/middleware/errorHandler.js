/**
 * Global Error Handler Wrapper
 */
const { error } = require('../utils/response');

function withErrorHandler(handlerFn) {
  return async (event, context) => {
    try {
      return await handlerFn(event, context);
    } catch (err) {
      console.error('[API ERROR]:', err);
      return error(err.message || 'Internal Server Error', err.statusCode || 500);
    }
  };
}

module.exports = {
  withErrorHandler,
};
