/**
 * POST /admin/login Controller
 * Supports multi-admin authentication (Admin 1 / Admin 2).
 */
const { verifyAdminCredentials, generateToken } = require('../../services/authService');
const { success, error } = require('../../utils/response');
const { withErrorHandler } = require('../../middleware/errorHandler');

const login = async (event) => {
  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return error('Invalid JSON payload', 400);
  }

  const { username, password } = body;

  const admin = verifyAdminCredentials(username, password);
  if (!admin) {
    return error('Invalid credentials', 401);
  }

  const token = generateToken({
    username: admin.username,
    role: admin.role,
    displayName: admin.displayName,
  });

  return success({
    success: true,
    token,
    user: {
      username: admin.username,
      name: admin.displayName,
      role: admin.role,
    },
  });
};

module.exports = {
  handler: withErrorHandler(login),
};
