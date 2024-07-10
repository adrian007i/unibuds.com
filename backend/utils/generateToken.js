const jwt = require("jsonwebtoken");
require('dotenv').config();

const generateToken = ({ _id,  }) => {
  const token = jwt.sign({
    _id,
  }, process.env.JWT_HASH, {
    expiresIn: '90d',
  });
  return token;
};

module.exports = generateToken;