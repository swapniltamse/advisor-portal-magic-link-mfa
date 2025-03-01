const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Hash a password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Verify a password
const verifyPassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

// Generate a JWT token
const generateToken = (user) => {
  const jwtSecret = process.env.JWT_SECRET;

  return jwt.sign({ userId: user.advisorId, email: user.email }, jwtSecret, {
    expiresIn: "1h",
  });
};

module.exports = {
  hashPassword,
  verifyPassword,
  generateToken,
};
