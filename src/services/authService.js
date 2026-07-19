/**
 * Authentication Service
 * Supports multiple admin accounts with distinct roles.
 * Compares credentials using bcrypt and generates JWT tokens.
 */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_change_in_prod';

// Admin credentials registry — loaded from environment variables
const ADMINS = [
  {
    username: process.env.ADMIN1_USERNAME || 'admin1@tat.tekkzy.com',
    passwordHash: process.env.ADMIN1_PASSWORD_HASH,
    displayName: process.env.ADMIN1_DISPLAY_NAME || 'Sumanta Sir',
    role: 'admin1',
  },
  {
    username: process.env.ADMIN2_USERNAME || 'admin2@tat.tekkzy.com',
    passwordHash: process.env.ADMIN2_PASSWORD_HASH,
    displayName: process.env.ADMIN2_DISPLAY_NAME || 'Others',
    role: 'admin2',
  },
];

/**
 * Verify admin credentials against the registry.
 * @returns {object|null} The matched admin object, or null if invalid.
 */
async function verifyAdminCredentials(username, password) {
  if (!username || !password) return null;

  const admin = ADMINS.find(
    (a) => a.username.toLowerCase() === username.trim().toLowerCase()
  );
  if (!admin) return null;

  if (!admin.passwordHash) {
    // No hash configured — reject login (no plaintext fallback for security)
    console.warn(`[Auth] No password hash configured for ${admin.role}`);
    return null;
  }

  const isValid = await bcrypt.compare(password, admin.passwordHash);
  return isValid ? admin : null;
}

function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

module.exports = {
  verifyAdminCredentials,
  generateToken,
};
