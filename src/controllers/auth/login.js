/**
 * POST /admin/login Controller
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

  const isValid = await verifyAdminCredentials(username, password);
  if (!isValid) {
    return error('Invalid credentials', 401);
  }

  const token = generateToken({ username, role: 'admin' });

  return success({
    success: true,
    token,
    user: {
      username,
      name: 'Trident Admin',
      role: 'admin',
    },
  });
};

module.exports = {
  handler: withErrorHandler(login),
};
