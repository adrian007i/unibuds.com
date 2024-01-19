const jwt = require("jsonwebtoken");
const keys = require("../config/keys")

const generateToken = ({ _id,  }) => {
  const token = jwt.sign({
    _id,
  }, keys["JWT_HASH"], {
    expiresIn: '90d',
  });
  return token;
};

module.exports = generateToken;