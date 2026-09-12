/**
 * JWT Authentication Middleware
 * Verifies Authorization: Bearer <token>
 */
const jwt = require('jsonwebtoken');
const { error } = require('../utils/response');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_change_in_prod';

function requireAuth(handlerFn) {
  return async (event, context) => {
    const authHeader = event.headers?.Authorization || event.headers?.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return error('Unauthorized: Missing or invalid token format', 401);
    }

    const token = authHeader.split(' ')[1];

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return error('Unauthorized: Invalid or expired token', 401);
    }

    event.user = decoded;
    return await handlerFn(event, context);
  };
}

module.exports = {
  requireAuth,
};

