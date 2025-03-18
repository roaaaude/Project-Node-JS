const jwt = require('jsonwebtoken');

/**
 * Generate a JWT token for a user
 * @param {string} id - User ID
 * @param {boolean} isBusiness - User business status
 * @param {boolean} isAdmin - User admin status
 * @returns {string} JWT token
 */
const generateToken = (id, isBusiness, isAdmin) => {
  return jwt.sign(
    { id, isBusiness, isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

module.exports = generateToken; 