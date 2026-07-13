/**
 * Authentication Service
 * Compares credentials using bcrypt and generates JWT tokens.
 */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_change_in_prod';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin@tat.tekkzy.com';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

async function verifyAdminCredentials(username, password) {
  if (!username || !password) return false;
  if (username.trim().toLowerCase() !== ADMIN_USERNAME.toLowerCase()) {
    return false;
  }

  if (ADMIN_PASSWORD_HASH) {
    return await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  }

  // Fallback dev check if hash is not configured
  return password === 'Password123@TRIDENT';
}

function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

module.exports = {
  verifyAdminCredentials,
  generateToken,
};
