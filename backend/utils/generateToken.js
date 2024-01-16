const jwt = require("jsonwebtoken");
const keys = require("../config/keys")

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, keys["JWT_HASH"], {
    expiresIn: '90d',
  });

  return token;
};

module.exports = generateToken;