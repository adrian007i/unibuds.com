const jwt = require("jsonwebtoken");
const keys = require("../config/keys")

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, keys["JWT_HASH"], {
    expiresIn: '90d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
  });
};

module.exports = generateToken;